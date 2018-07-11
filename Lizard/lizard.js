//<script type="text/javascript" src="../Utils/prng.js"></script>
//<script type="text/javascript" src="lizard_random_values.js"></script>
//===============================================================================
//The default constructor
function initMatrixDefault(x, y) {
	var matrix = new Array(x);
	for (var i = 0; i < x; i++) {
       		matrix[i] = new Array(y);
	}
	return matrix;
}

//The constructor, each element is chosen uniformly
function initMatrixRandom(x, y, q) {
	var matrix = new Array(x);
	for (var i = 0; i < x; i++) {
       		matrix[i] = new Array(y);
		for (var j = 0; j < y; j++) {
			matrix[i][j] = nextInt(q);
		}
	}
	return matrix;
}

//A', the transpose of a matrix A
function transpose(A) {
	var A_x = A.length;
	var A_y = A[0].length;
	
	var C = initMatrixDefault(A_y, A_x);
	for (var i = 0; i < A_x; i++) {
		for (var j = 0; j < A_y; j++) {
			C[j][i] = A[i][j];
		}
	}
	return C;
}
	
//Matrix C = A + B
function addMod(A, B, q) {
	checkDimensions(A, B);
	var A_x = A.length;
	var A_y = A[0].length;
	
	var C = initMatrixDefault(A_x, A_y);
	for (var i = 0; i < A_x; i++) {
		for (var j = 0; j < A_y; j++) {
			C[i][j] = (A[i][j] + B[i][j]) % q;
			if (C[i][j] < 0) {
				C[i][j] += q;
			}
		}
	}
	return C;
}
	
//Vector c = a - b
function vectorSubstract(a, b) {
	if (b.length != a.length) {
		alert("Vector length must agree");
		return;
	}
	
	var c = new Array(a.length);
	for (var i = 0; i < a.length; i++) {
		c[i] = a[i] - b[i];
	}
	return c;
}
	
//Multiplies a vector by a scalar, c = s*v
function scalarMultiplyVector(s, v) {
	var c = new Array(v.length);
	for (var i = 0; i < v.length; i++) {
		c[i] = s * v[i];
	}
	return c;
}

//Multiplies a matrix by a scalar, C = s*A
function scalarMultiplyMod(s, A, q) {
	var A_x = A.length;
	var A_y = A[0].length;
	
	var C = initMatrixDefault(A_x, A_y);
	for (var i = 0; i < A_x; i++) {
		for (var j = 0; j < A_y; j++) {
			C[i][j] = (s * A[i][j]) % q;
			if (C[i][j] < 0) {
				C[i][j] += q;
			}
		}
	}
	return C;
}

//Matrix C = A * B
function multiply(A, B) {
	var A_x = A.length;
	var A_y = A[0].length;
	var B_x = B.length;
	var B_y = B[0].length;
	
	if (B_x != A_y) {
		alert("Matrix inner dimensions must agree");
		return;
	}
	
	var C = initMatrixDefault(A_x, B_y);
	var Bcolj = new Array(A_y);
	for (var j = 0; j < B_y; j++) {
		for (var k = 0; k < A_y; k++) {
			Bcolj[k] = B[k][j];
		}
		for (var i = 0; i < A_x; i++) {
			var Arowi = A[i];
			var s = 0;
			for (var k = 0; k < A_y; k++) {
				if (Bcolj[k] == 0) {
					//s += 0;
				} else if (Bcolj[k] == 1) {
					s += Arowi[k];
				} else if (Bcolj[k] == -1) {
					s -= Arowi[k];
				} else {
					s += Arowi[k] * Bcolj[k];
				}
			}
			C[i][j] = s;
		}
	}
	return C;
}

//Matrix C = A * B, each element of C modulo q
function multiplyMod(A, B, q) {
	var A_x = A.length;
	var A_y = A[0].length;
	var B_x = B.length;
	var B_y = B[0].length;
	
	if (B_x != A_y) {
		alert("Matrix inner dimensions must agree");
		return;
	}
	
	var C = initMatrixDefault(A_x, B_y);
	var Bcolj = new Array(A_y);
	for (var j = 0; j < B_y; j++) {
		for (var k = 0; k < A_y; k++) {
			Bcolj[k] = B[k][j];
		}
		for (var i = 0; i < A_x; i++) {
			var Arowi = A[i];
			var s = 0;
			for (var k = 0; k < A_y; k++) {
				if (Bcolj[k] == 0) {
					//s += 0;
				} else if (Bcolj[k] == 1) {
					s += Arowi[k];
				} else if (Bcolj[k] == -1) {
					s -= Arowi[k];
				} else {
					s += Arowi[k] * Bcolj[k];
				}
			}
			C[i][j] = s % q;
			if (C[i][j] < 0) {
				C[i][j] += q;
			}
		}
	}
	return C;
}

//For Encrypt
//Multiplies a matrix B by a vector a, c = a * B
function encVectorMultiplyMatrix(a, B) {
	//var A_x = 1;
	var A_y = a.length;
	var B_x = B.length;
	var B_y = B[0].length;
	
	if (B_x != A_y) {
		alert("Matrix inner dimensions must agree");
		return;
	}
		
	var v = new Array(B_y);
	for (var j = 0; j < B_y; j++) {
		v[j] = 0;
	}
		
	for (var i = 0; i < A_y; i++) {
		var Browi = B[i];
		for (var j = 0; j < B_y; j++) {
			if (a[i] == 0) {
				//v[j] += 0;
			} else if (a[i] == 1) {
				v[j] += Browi[j];	
			} else if (a[i] == -1) {
				v[j] -= Browi[j];
			} else {
				v[j] += a[i] * Browi[j];
			}
		}
	}
	return v;
}


//For Decrypt
//Multiplies a matrix B by a vector a, c = a * B
function decVectorMultiplyMatrix(a, B) {
	//var A_x = 1;
	var A_y = a.length;
	var B_x = B.length;
	var B_y = B[0].length;
	
	if (B_x != A_y) {
		alert("Matrix inner dimensions must agree");
		return;
	}
		
	var v = new Array(B_y);
	for (var j = 0; j < B_y; j++) {
		v[j] = 0;
	}
		
	for (var i = 0; i < A_y; i++) {
		var Browi = B[i];
		for (var j = 0; j < B_y; j++) {
			/*
			if (Browi[j] == 0) {
				//v[j] += 0;
			} else if (Browi[j] == 1) {
				v[j] += a[i];
			} else if (Browi[j] == -1) {
				v[j] -= a[i];
			} else {
			*/
				v[j] += a[i] * Browi[j];	// it will be a little bit faster for decrypt on Firefox
			//}
		}
	}
	return v;
}

//Mod q
function mod(A, q) {
	var A_x = A.length;
	var A_y = A[0].length;
	if (q <= 0) {
		alert("modulus not positive");
		return;
	}
	for (var i = 0; i < A_x; i++) {
		for (var j = 0; j < A_y; j++) {
			A[i][j] %= q;
			if (A[i][j] < 0) {
				A[i][j] += q;
			}
		}
	}
}

//Checks if size(A) == size(B)
function checkDimensions(A, B) {
	var A_x = A.length;
	var A_y = A[0].length;
	var B_x = B.length;
	var B_y = B[0].length;
	
	if (B_x != A_x || B_y != A_y) {
		alert("Matrix dimensions must agree");
		return;
	}
}

//Returns the next pseudorandom, uniformly distributed integer between 0(inclusive) and q-1(inclusive)
function nextInt(q) {
	return Math.floor(random() * q);
}

//Returns the pseudorandom integer value between low(inclusive) and high(inclusive)
function rangeValue(low, high) {
	return Math.floor(random() * (high - low + 1) + low);
}

//Shuffles the input array
function shuffle(arr) {
	var arr2 = arr.slice();
	for(var j, x, i = arr2.length; i; j = parseInt(random() * i), x = arr2[--i], arr2[i] = arr2[j], arr2[j] = x);
	return arr2;    
}

//***********************************************************
var am;
var bm;
var sm;
var vvector;
var av;
var bv;
var resultvector;
var m_transpose;
//***********************************************************
function randomPlaintext () {
	var plaintext = new Array(l);
	for (var i = 0; i < l; i++) {
       		plaintext[i] = nextInt(2);
	}
	vvector = plaintext;
	m_transpose = scalarMultiplyVector(128, vvector);
}
//***********************************************************
function keyGeneration(l, m, n, q) {
	//A, m*n
	var amatrix = initMatrixRandom(m, n, q);
	//var amatrix = aa;	// Does not apply in WSH
	//S, n*l
	var smatrix = ss;
	//E, m*l
	var ematrix = ee;
	//B = AS + E mod q, m*l
	var bmatrix = multiply(amatrix, smatrix);
	bmatrix = addMod(bmatrix, ematrix, q);
	
	am = amatrix;
	bm = bmatrix;
	sm = smatrix;
}

function encrypt(l, n, p, q) {
	var amatrix = am;
	var bmatrix = bm;
	
	var rvector_transpose = rr;	// Z^1*m
	var c1_prime_transpose = encVectorMultiplyMatrix(rvector_transpose, amatrix);
	var c2_prime_transpose = encVectorMultiplyMatrix(rvector_transpose, bmatrix);
	
	var c1_transpose = new Array(n);
	for (var i = 0; i < n; i++) {
		c1_prime_transpose[i] = c1_prime_transpose[i] % q;
		c1_transpose[i] = Math.round(0.25 * c1_prime_transpose[i]) % p;
		if (c1_transpose[i] < 0) {
			c1_transpose[i] += p;
		}
	}
	
	var c2_transpose = new Array(l);
	for (var i = 0; i < l; i++) {
		c2_prime_transpose[i] = c2_prime_transpose[i] % q;
		c2_transpose[i] = Math.round(m_transpose[i] + (0.25 * c2_prime_transpose[i])) % p;
		if (c2_transpose[i] < 0) {
			c2_transpose[i] += p;
		}
	}
	
	av = c1_transpose;
	bv = c2_transpose;
}

function decrypt(l, q, t) {
	var c1vector_transpose = av;
	var c2vector_transpose = bv;
	var smatrix = sm;

	var c1TS = decVectorMultiplyMatrix(c1vector_transpose, smatrix);
	var resultvector_transpose = vectorSubstract(c2vector_transpose, c1TS);
	//resultvector = scalarMultiply(0.0078125, resultvector_transpose);	// t/p = 1/128
	resultvector = new Array(l);
	for (var i = 0; i < l; i++) {
		resultvector[i] = Math.round(0.0078125 * resultvector_transpose[i]) % t;
		if (resultvector[i] < 0) {
			resultvector[i] += t;
		}
	}
}
//===============================================================================
//------------------------------------------- start lizard -------------------------------------------
var m = 960,
	n = 608,
	t = 2,
	r = 1,
	l = 256,
	p = 256,
	q = 1024,
	h = 128,
	alpha = 0.000363;

function testlizard() {
	print("Test Lizard:");
	print("Input:");
	print("m = " + m);
	print("n = " + n);
	print("l = " + l);
	print("t = " + t);
	print("p = " + p);
	print("q = " + q);
	print("h = " + h);
	print("α = " + alpha);
	
	randomPlaintext();
	keyGeneration(l, m, n, q);
	encrypt(l, n, p, q);
	decrypt(l, q, t);
	
	print("Output:");
	var ms = vvector.toString();
	print("plain text =  " + ms);
	var ts = resultvector.toString();
	print("resulttext = " + ts);
	
	if(ts == ms) {
		print("Success!");
	} else {
		print("Failed");
	}
}
//***********************************************************
function print(message) {
	//WScript.Echo(message);
	console.log(message);
}
testlizard();
