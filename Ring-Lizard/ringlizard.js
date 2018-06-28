	//<script type="text/javascript" src="Utils/prng.js"></script>	

	// Generate a random integer between 0(inclusive) and q-1(inclusive)
	function nextInt(q) {
		return Math.floor(random() * q);	// prng.js -> random()
	}
	
	// Generate a random integer between low(inclusive) and high(inclusive)
	function rangeValue(low, high) {
		return Math.floor(random() * (high - low + 1) + low);
	}
		
	function shuffle(arr) {
		var arr2 = arr.slice();
		for (var j, x, i = arr2.length; i; j = parseInt(random() * i), x = arr2[--i], arr2[i] = arr2[j], arr2[j] = x);
		return arr2;
	}
	
	//rejection sampling
	function testRejectionSampling(c, sigma) {
		// Input: a center c, a gaussian parameter sigma, and a tail-cut parameter tau
		// Output: x, with distribution statistically close to D_z,c,tau
		// 1: h = - PI/(sigma^2); x_max = ceil(c + tau * sigma); x_min = floor(c - tau * sigma)
		// 2: x = RandInt[x_min, x_max]; p = exp(h * (x - c)^2)
		// 3: r = RandFloat[0, 1), if r < p then return x
		// 4: Goto Step 2
		var tau = 13;
		var h = - Math.PI / Math.sqrt(sigma);
		var x_max = Math.ceil(c + tau * sigma);
		var x_min = Math.floor(c - tau * sigma);
		while (true) {
			var x = rangeValue(x_min, x_max);
			var p = Math.exp(
					(h * Math.sqrt(x - c))
					);

			var r = random();
			if (r < p) {
				return x;
			}
		}
	}

	//return a copy of the original array, truncated or padded with zeros to obtain the specified length
	function copyOf(arr1, length) {
		//    	var arr2 = new Array(length);
		var arr2 = [];
		for (var i = 0; i < length; i++) {
			if (i >= arr1.length) {
				arr2[i] = 0;
			} else {
				arr2[i] = arr1[i];
			}
		}
		return arr2;
	}

	//return a new array containing the specified range from the original array, 
	//truncated or padded with nulls to obtain the required length
	function copyOfRange(arr1, from, to) {
		var length = to - from;
		//    	var arr2 = new Array(length);
		var arr2 = [];
		for (var i = 0; i < length; i++) {
			if (i >= arr1.length || from >= arr1.length) {
				arr2[i] = 0;
			} else {
				arr2[i] = arr1[from];
			}
			from++;
		}
		return arr2;
	}
	
	// Karatsuba multiplication
	function karatsuba(a, b) {	
		var n = b.length;

		if (n <= 32) {
			var cn = (n << 1) - 1;
			//var c = new Array(cn).fill(0);
			var c = new Array(cn);
			for (var k = 0; k < cn; k++) {
				c[k] = 0;
			}
			for (var k = 0; k < cn; k++) {
				for (var i = Math.max(0, k - n + 1); i <= Math.min(k, n - 1); i++) {
					c[k] += b[i] * a[k - i];
				}
			}
			return c;
		} else {
			var n1 = (n >> 1);
			var a1 = copyOf(a.slice(), n1);
			var a2 = copyOfRange(a.slice(), n1, n);
			var b1 = copyOf(b.slice(), n1);
			var b2 = copyOfRange(b.slice(), n1, n);

			// make a copy of a1 that is the same length as a2
			var A = copyOf(a1.slice(), a2.length);
			addIntPoly(A, a2);
			// make a copy of b1 that is the same length as b2
			var B = copyOf(b1.slice(), b2.length);
			addIntPoly(B, b2);

			var c1 = karatsuba(a1, b1);
			var c2 = karatsuba(a2, b2);
			var c3 = karatsuba(A, B);
			subIntPoly(c3, c1);
			subIntPoly(c3, c2);
				
			//var c = new Array((n << 1) - 1).fill(0);
			var c = new Array((n << 1) - 1);
			for (var k = 0; k < c.length; k++) {
				c[k] = 0;
			}
			for (var i = 0; i < c1.length; i++) {
				c[i] = c1[i];
			}
			for (var i = 0; i < c3.length; i++) {
				c[n1 + i] += c3[i];
			}
			for (var i = 0; i < c2.length; i++) {
				c[(n1 << 1) + i] += c2[i];
			}
			return c;
		}
	}
	
	function addIntPoly(a, b) {
		for (var i = 0; i < b.length; i++) {
			a[i] += b[i];
		}
	}

	function subIntPoly(a, b) {
		for (var i = 0; i < b.length; i++) {
			a[i] -= b[i];
		}
	}
	
	//Multiplies each coefficient by a int. Does not return a new polynomial but modifies this polynomial.
	function multInt(a, factor) {
		for (var i = 0; i < a.length; i++) {
			a[i] *= factor;		
		}
	}
	
	//------------------------------------------- keyGeneration -------------------------------------------
	var pka;
	var pkb;
	var sks;
	function keyGeneration(n, q, sigma) {
		var a = new Array(n);	// public key a
		var b;	// public key b
		var s;	// secret key a
		var e = new Array(n);
		var arr_s = new Array(n);

		for (var i = 0; i < n; i++) {
			e[i] = testRejectionSampling(0.0, sigma);
		}
		for (var i = 0; i < 64; i++) {
			arr_s[i] = 1;
			arr_s[i+ 64] = -1;
		}
		for (var i = 128; i < n; i++) {
			arr_s[i] = 0;
		}
		
		for (var i = 0; i < n; i++) {
			a[i] = nextInt(q);
		}
		
		pka = a;
		s = shuffle(arr_s);
		sks = s;
		b = multSubModPoly(a, s, e, q);
		pkb = b;
	}
	
	//***************************************************************
	function multSubModPoly(a, s, e, modulus) {
		var N = a.length;
		if (s.length != N) {
			alert("Number of coefficients must be the same");
			return;
		}
		var c = karatsuba(a, s);
		
		var b;
		if (c.length > N) {
			for (var k = N; k < c.length; k++) {
				c[k - N] += c[k];
				//alert("c[k-N]:" + c[k-N]);
			}
			b = copyOf(c, N);
		}
		
		for (var i = 0; i < b.length; i++) {
			b[i] = e[i] - b[i];
			if (modulus == 2048) {			
				b[i] = b[i] & 2047;
			} else if (modulus == 1024) {			
				b[i] = b[i] & 1023;
			} else {
				b[i] %= modulus;
			}
			if(b[i] < 0) {
				b[i] += modulus;
			}
		}
		return b;
	}
	//------------------------------------------- encrypt -------------------------------------------
	var cpc1;
	var cpc2;
	function encrypt(n, _m) {
		a = pka;
		b = pkb;
		var arr_r = new Array(n);
		
		for (var i = 0; i < 64; i++) {
			arr_r[i] = 1;
			arr_r[i+ 64] = -1;
		}
		for (var i = 128; i < n; i++) {
			arr_r[i] = 0;
		}
			
		var r = shuffle(arr_r);
		var c1 = multModPolyC1(a, r, 0.25, 256);
		var c2 = multAddModPolyC2(b, r, _m, 0.25, 256);
		
		cpc1 = c1;
		cpc2 = c2;
	}
	//***************************************************************
	function multModPolyC1(a, r, f, modulus) {
		var N = a.length;
		if (r.length != N) {
			alert("Number of coefficients must be the same");
			return;
		}
		var c = karatsuba(a, r);
		
		var c1;
		if (c.length > N) {
			for (var k = N; k < c.length; k++) {
				c[k - N] += c[k];
				//alert("c[k-N]:" + c[k-N]);
			}
			c1 = copyOf(c, N);
		}
		
		for (var i = 0; i < c1.length; i++) {
			c1[i] = Math.round(c1[i] * f);
			if (modulus == 2048) {			
				c1[i] = c1[i] & 2047;
			} else if (modulus == 256) {			
				c1[i] = c1[i] & 255;
			} else {
				c1[i] %= modulus;
			}
			if(c1[i] < 0) {
				c1[i] += modulus;
			}
		}
		return c1;
	}
	
	function multAddModPolyC2(b, r, _m, f, modulus) {
		var N = b.length;
		if (r.length != N) {
			alert("Number of coefficients must be the same");
			return;
		}
		var c = karatsuba(b, r);
		
		var c2;
		if (c.length > N) {
			for (var k = N; k < c.length; k++) {
				c[k - N] += c[k];
				//alert("c[k-N]:" + c[k-N]);
			}
			c2 = copyOf(c, N);
		}
		
		for (var i = 0; i < c2.length; i++) {
			c2[i] = Math.round((c2[i] * f) + _m[i]);
			if (modulus == 2048) {			
				c2[i] = c2[i] & 2047;
			} else if (modulus == 256) {			
				c2[i] = c2[i] & 255;
			} else {
				c2[i] %= modulus;
			}
			if(c2[i] < 0) {
				c2[i] += modulus;
			}
		}
		return c2;
	}
	
	//------------------------------------------- decrypt -------------------------------------------
	var result; // result
	function decrypt() {
		c1 = cpc1;
		c2 = cpc2;
		s = sks;

		result = multAddModPolyResult(c1, s, c2, 0.0078125, 2);
	}
	//***************************************************************
	function multAddModPolyResult(c1, s, c2, f, modulus) {
		var N = c1.length;
		if (s.length != N) {
			alert("Number of coefficients must be the same");
			return;
		}
		
		var c = karatsuba(c1, s);
		
		var res;
		if (c.length > N) {
			for (var k = N; k < c.length; k++) {
				c[k - N] += c[k];
				//alert("c[k-N]:" + c[k-N]);
			}
			res = copyOf(c, N);
		}
		
		for (var i = 0; i < res.length; i++) {
			res[i] = Math.round((c2[i] + res[i]) * f);
			if (modulus == 2048) {			
				res[i] = res[i] & 2047;
			} else if (modulus == 2) {			
				res[i] = res[i] & 1;
			} else {
				res[i] %= modulus;
			}
			if(res[i] < 0) {
				res[i] += modulus;
			}
		}
		return res;
	}
	//------------------------------------------- start ringlizard -------------------------------------------
	function testringlizard() {
		var n = 1024;
		var q = 1024;
		var a_1 = 154;	//a^{-1}
		var sigma = 6.649 / 2.5066;	// a*q/sqrt(2*PI)
		
		print("Test ring-lizard:");
		print("Input:");
		print("n = " + n);
		print("q = " + q);
		print("a^{-1} = " + a_1);

		var m = [];
		for (var i = 0; i < n; i++) {
			m[i] = nextInt(2);
		}
			
		var _m = copyOf(m, m.length);
		//encode
		multInt(_m, 128);

		keyGeneration(n, q, sigma);
		encrypt(n, _m);
		decrypt();
		
		var ms = m.toString();
		var rs = result.toString();
		
		
		print("Output:");
		print("plain text =  " + ms);
		print("result = " + rs);
		
		if(rs == ms) {
			print("Success!");
		} else {
			print("Failed");
		}
		print("");
	}
	
	//***********************************************************
	function print(message) {
	//	WScript.Echo(message);
		console.log(message);
	}
	testringlizard();
