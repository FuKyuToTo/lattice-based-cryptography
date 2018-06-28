//<script type="text/javascript" src="Utils/prng.js"></script>
//<script type="text/javascript" src="frodo_random_values.js"></script>
//=======================================================================================
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
	
	var set = function(m, n, current) {
		matrix[m][n] = current;
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
			alert("modulus is nonpositive");
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
    
	//Check if size(A) == size(B)
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
//=======================================================================================
var am;
var bm;
var sm;
var bb;
var cc;

var arr_v;
var k1matrix;
var k2matrix;

function alice0() {
    var amatrix = TestMatrix();
	var smatrix = TestMatrix();
	var ematrix = TestMatrix();

    amatrix.initMatrix_random(n, n, q);
	smatrix.initMatrix_2d_uncheck(ss, n, l);
	ematrix.initMatrix_2d_uncheck(ee, n, l);
	
	var bmatrix = TestMatrix();
	bmatrix = amatrix.multiply(smatrix).add(ematrix);
	bmatrix.mod(q);
	
	am = amatrix;
	bm = bmatrix;
	sm = smatrix;
}

function bob() {
	var amatrix = am;
	var bmatrix = bm;
	
	var s1matrix = TestMatrix();	// Z^m*n
	var e1matrix = TestMatrix();	// Z^m*n
	var e2matrix = TestMatrix();	// Z^m*l
	
	s1matrix.initMatrix_2d_uncheck(ss1, m, n);
	e1matrix.initMatrix_2d_uncheck(ee1, m, n);
	e2matrix.initMatrix_2d_uncheck(ee2, m, l);
	
	var b1matrix = s1matrix.multiply(amatrix);
	var vmatrix = s1matrix.multiply(bmatrix);
	
    b1matrix = b1matrix.add(e1matrix);  // Z^m*n
    b1matrix.mod(q);
    vmatrix = vmatrix.add(e2matrix);    // Z^m*l
	vmatrix.mod(q);
	
	var newC = [];
	var newV = [];
	for (var i = 0; i < vmatrix.getMatrix().length; i++) {
		newC[i] = vmatrix.getMatrix()[i].slice();
		newV[i] = vmatrix.getMatrix()[i].slice();
	}
	
	var cmatrix = TestMatrix();    // Z^m*l
	k1matrix = TestMatrix();     // Z^m*l
	cmatrix.initMatrix_2d_uncheck(newC, m, l);
	k1matrix.initMatrix_2d_uncheck(newV, m, l);
	
	var arr_c = cmatrix.getMatrix();
	var arr_k1 = k1matrix.getMatrix();
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < l; j++) {
            arr_c[i][j] = (arr_c[i][j] >> 10) & 1;	// >> logq - b - 1
            //arr_c[i][j] = Math.floor(arr_c[i][j] * 0.0009765625) % 2;
			
			arr_k1[i][j] = (arr_k1[i][j] + 1024) % q;
            arr_k1[i][j] >>= 11;  // >>= logq - b
            //arr_k1[i][j] = Math.round(arr_k1[i][j] * 0.00048828125) % 16;
        }
    }
	
	bb = b1matrix;
	cc = cmatrix;
}

function alice1() {
	var b1m = bb;
	var cm = cc;
	var smatrix = sm;
	
	var b1s = b1m.multiply(smatrix);    // Z^m*l
	b1s.mod(q);
    k2matrix = b1s;     // Z^m*l
	rec(k2matrix.getMatrix(), m, l, 11, cm.getMatrix());
}
//--------------------------------------------------------------------------------------
function rec(b1s, m, l, a, h) {
	var whole = 1 << a;
	var mask = whole - 1;
	var negmask = ~mask;
	var half = 1 << (a - 1);
	var quarter = 1 << (a - 2);

	for (var i = 0; i < m; i++) {
        for (var j = 0; j < l; j++) {
			var remainder = b1s[i][j] & mask;
			var use_hint = ((remainder + quarter) >> (a - 1)) & 1;
			//h: the hint of cmatrix
			var shift = use_hint * (2 * h[i][j] - 1) * quarter;
			// if use_hint = 1 and h = 0, adding -quarter forces rounding down
			//                     h = 1, adding quarter forces rounding up
			b1s[i][j] = (b1s[i][j] + half + shift) & negmask;
			
			b1s[i][j] >>= 11;
			b1s[i][j] %= 16;
		}
	}
}
//------------------------------------------- start testfrodo -------------------------------------------
var b = 4;
	l = 8,
	m = 8,
	n = 752,
	q = 32768;	//logq = 15

function testfrodo() {
	print("Test Frodo:");
	print("Input:");
	print("b = " + b);
	print("l = " + l);
	print("m = " + m);
	print("n = " + n);
	print("q = " + q);
	print("Output:");
	
	alice0();
	bob();
	alice1();
	
	var ka = k2matrix.getMatrix().toString();
	print("k_a = " + ka);
	var kb = k1matrix.getMatrix().toString();
	print("k_b = " + kb);
	
	if(ka == kb) {
		print("Success!");
	} else {
		print("Failed");
	}
	print("");
}
//***********************************************************
function print(message) {
//	WScript.Echo(message);	//for WSH
	console.log(message);
}
testfrodo();
