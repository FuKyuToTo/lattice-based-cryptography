//<script type="text/javascript" src="Utils/prng.js"></script>
//===============================================================================
var TestMatrix = function() {
    var x = 0;
    var y = 0;
    var matrix = [];

    var initMatrix_default = function(m, n) {
        x = m;
        y = n;
        for (var i = 0; i < m; i++) {
        	matrix[i] = [];
        }
    };

    var initMatrix_random = function(m, n, q) {
		this.initMatrix_default(m, n);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				matrix[i][j] = nextInt(q);
			}
		}
	};
	
    var initMatrix_range = function(m, n, low, high) {
		this.initMatrix_default(m, n);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				matrix[i][j] = rangeValue(low, high);
			}
		}
	};
	
	var initMatrix_identity = function(m, n) {
		this.initMatrix_default(m, n);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				matrix[i][j] = (i == j ? 1 : 0);
			}
		}
	};
    
    var initMatrix_2d_check = function(arr) {
		x = arr.length;
		y = arr[0].length;
		for (var i = 0; i < m; i++) {
			if (arr[i].length != n) {
				alert("All rows must have the same length");
		        return;
			}
		}
		matrix = arr;
	};
	
    var initMatrix_2d_uncheck = function(arr, m, n) {
		matrix = arr;
		x = m;
		y = n;
	};
	
	var initMatrix_expansion = function(arr, m) {
		x = m;
		y = (m != 0 ? arr.length / m : 0);
		if (m * y != arr.length) {
			alert("Array length must be a multiple of m");
			return;
		}
		this.initMatrix_default(m, y);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < y; j++) {
				if(undefined == arr[i + j * m]) {
					matrix[i][j] = 0.0;
				} else {
					matrix[i][j] = arr[i + j * m];
				}
			}
		}
	};
//	-------------------------------------------public method-------------------------------------------
	var getMatrix = function() {
		return matrix;
	};
	
	var set = function(m, n, val) {
		matrix[m][n] = val;
	};
	
	var get = function(m, n) {
		return matrix[m][n];
	};
	
	//A'
	var transpose = function() {
		var X = TestMatrix();
		X.initMatrix_default(y, x);
		var C = X.getMatrix();
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				C[j][i] = matrix[i][j];
			}
		}
		return X;
	};
	
	//C = A + B
	var add = function(B) {
		checkMatrixDimensions(B);
		var X = TestMatrix();
		X.initMatrix_default(x, y);
		var C = X.getMatrix();
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				C[i][j] = matrix[i][j] + B.matrix()[i][j];
			}
		}
		return X;
	};
	
	//C = A - B
	var substract = function(B) {
		checkMatrixDimensions(B);
		var X = TestMatrix();
		X.initMatrix_default(x, y);
		var C = X.getMatrix();
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				C[i][j] = matrix[i][j] - B.matrix()[i][j];
			}
		}
		return X;
	};
	
	//Multiply a matrix by a scalar, C = s*A
	var scalarMultiply = function(s) {
		var X = TestMatrix();
		X.initMatrix_default(x, y);
		var C = X.getMatrix();
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				C[i][j] = s * matrix[i][j];
			}
		}
		return X;
	};
	
	//C = A * B
	var multiply = function(B) {
		if (B.x() != y) {
			alert("Matrix inner dimensions must agree");
			return;
		}
		var X = TestMatrix();
		X.initMatrix_default(x, B.y());
		var C = X.getMatrix();
		var Bcolj = [];
		for (var j = 0; j < B.y(); j++) {
			for (var k = 0; k < y; k++) {
				Bcolj[k] = B.matrix()[k][j];
			}
			for (var i = 0; i < x; i++) {
				var Arowi = matrix[i];
				var s = 0;
				for (var k = 0; k < y; k++) {
					s += Arowi[k] * Bcolj[k];
				}
				C[i][j] = s;
			}
		}
		return X;
	};

	//Multiply a matrix B by a vevtor a, c = a * B
	var vectorMultiplyMatrix = function(B) {
		if (B.x() != y) {
			alert("Matrix inner dimensions must agree");
			return;
		}
		var Av = getMatrix()[0];
		var v = new Array(B.y());
		for (var j = 0; j < B.y(); j++) {
			v[j] = 0;
		}
		for (var i = 0; i < y; i++) {
			var Browi = B.matrix()[i];
			for (var j = 0; j < B.y(); j++) {
				v[j] += Browi[j]*Av[i];
			}
		}
		var X = TestMatrix();
		X.initMatrix_default(1, B.y());
		var C = X.getMatrix();
		C[0] = v;
		return X;
	};
	
	//C = A * B mod q
	var multiplyMod = function(B, q) {
		if (B.x() != y) {
			alert("Matrix inner dimensions must agree.");
			return;
		}
		var X = TestMatrix();
		X.initMatrix_default(x, B.y());
		var C = X.getMatrix();
		var Bcolj = [];
		for (var j = 0; j < B.y(); j++) {
			for (var k = 0; k < y; k++) {
				Bcolj[k] = B.matrix()[k][j];
			}
			for (var i = 0; i < x; i++) {
				var Arowi = matrix[i];
				var s = 0;
				for (var k = 0; k < y; k++) {
					s += Arowi[k] * Bcolj[k];
				}
				C[i][j] = s % q;
				if (C[i][j] < 0) {
					C[i][j] += q;
				}
				if (C[i][j] == 0) {
					C[i][j] = 0;
				}
			}
		}
		return X;
	};
	
	var mod = function(q) {
		if (q <= 0) {
			alert("Modulus is nonpositive");
			return
		}
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				matrix[i][j] %= q;
				if (matrix[i][j] < 0) {
					matrix[i][j] += q;
				}
			}
		}
	};
//	-------------------------------------------private method-------------------------------------------
	function nextInt(q) {
	    return Math.floor(random() * q);	//prng.js -> random()
	}
	
	function rangeValue(low, high) {
		return Math.floor(random() * (high - low + 1) + low);
	}
	
    	function shuffle(arr) {
    		var arr2 = arr.slice();
    		for(var j, x, i = arr2.length; i; j = parseInt(random() * i), x = arr2[--i], arr2[i] = arr2[j], arr2[j] = x);
    		return arr2;    
  	}
    
	function checkMatrixDimensions(B) {
		if (B.x() != x || B.y() != y) {
			alert("Matrix dimensions must agree");
			return;
		}
	}

    return {
      matrix:function() {return matrix;},
      x:function() {return x;},
      y:function() {return y;},
      //
      initMatrix_default:initMatrix_default,
      initMatrix_random:initMatrix_random,
      initMatrix_range:initMatrix_range,
	  initMatrix_identity:initMatrix_identity,
      initMatrix_2d_check:initMatrix_2d_check,
      initMatrix_2d_uncheck:initMatrix_2d_uncheck,
      initMatrix_expansion:initMatrix_expansion,
      
      getMatrix:getMatrix,
      set:set,
      get:get,
      transpose:transpose,
      add:add,
      substract:substract,
      scalarMultiply:scalarMultiply,
      multiply:multiply,
      vectorMultiplyMatrix:vectorMultiplyMatrix,
      multiplyMod:multiplyMod,
      mod:mod
    };
};
//---------------------------------------------------------------------------------------------------
var am;
var bm;
var sm;
var vvector;
var av;
var bv;
var resultvector;

function keyGeneration() {
	var amatrix = TestMatrix();
	var smatrix = TestMatrix();
	var ematrix = TestMatrix();
	//B = AS + E mod q, m*l
	var bmatrix = TestMatrix();
	
	//amatrix.initMatrix_random(m, n, q);
	amatrix.initMatrix_2d_uncheck(aa, m, n);
	smatrix.initMatrix_2d_uncheck(ss, n, l);
	ematrix.initMatrix_2d_uncheck(ee, m, l);
	
	bmatrix = amatrix.multiply(smatrix).add(ematrix);
	bmatrix.mod(q);
	
	am = amatrix;
	bm = bmatrix;
	sm = smatrix;
}

function encrypt() {
	var amatrix = am;
	var bmatrix = bm;
	var rvector_transpos = TestMatrix();	// Z^1*m
	rvector_transpos.initMatrix_expansion(rr, 1);
	
	var c1_prime_transpos = rvector_transpos.vectorMultiplyMatrix(amatrix);
	var c2_prime_transpos = rvector_transpos.vectorMultiplyMatrix(bmatrix);
	var c1_transpos = c1_prime_transpos.scalarMultiply(0.25);
	
	var arr_c1 = c1_transpos.getMatrix();
	for (var i = 0; i < arr_c1[0].length; i++) {
		arr_c1[0][i] = Math.round(arr_c1[0][i]);
	}
	
	var m_transpos = vvector.scalarMultiply(128);
	var c2_transpos = (c2_prime_transpos.scalarMultiply(0.25)).add(m_transpos);
	
	var arr_c2 = c2_transpos.getMatrix();
	for (var i = 0; i < arr_c2[0].length; i++) {
		arr_c2[0][i] = Math.round(arr_c2[0][i]);
	}
	
	av = c1_transpos;
	bv = c2_transpos;
}

function decrypt() {
	var c1vector_transpos = av;
	var c2vector_transpos = bv;
	var smatrix = sm;
	
	var c1TS = c1vector_transpos.vectorMultiplyMatrix(smatrix);
	var resultvector_transpos = c2vector_transpos.substract(c1TS);
	resultvector = resultvector_transpos.scalarMultiply(0.0078125);	// t/p = 1/128
	
	var arr = resultvector.getMatrix();
	for (var i = 0; i < arr[0].length; i++) {
		arr[0][i] = Math.round(arr[0][i]);
	}
	resultvector.mod(t);
}
//--------------------------------------------------------------------------------------
function randomPlaintext () {
	var plaintext = TestMatrix();
	plaintext.initMatrix_random(1, l, 2);
	vvector = plaintext;
}
//--------------------------------------------------------------------------------------
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
	
	randomPlaintext();
	var ms = vvector.getMatrix().toString();
	print("plain text = " + ms);
	print("Output:");
	
	keyGeneration();
	encrypt();
	decrypt();
	
	var rs = resultvector.getMatrix().toString();
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
	//WScript.Echo(message);
	console.log(message);
}
testlizard();
