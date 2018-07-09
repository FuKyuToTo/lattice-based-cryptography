//<script type="text/javascript" src="../Utils/prng.js"></script>

var INVN = 7651; // 256 * 7651 = 1 mod q
var bitRev_psi_7681_256 = [
	1, 4298, 1213, 5756, 7154, 849, 5953, 583, 1366, 2784, 5543, 5033, 2132, 7584, 5300, 5235, 7351, 2645, 6803, 5408, 4928, 4027, 1846, 7316, 2399, 3000, 6569, 5887, 3092, 1286, 2268, 675, 5773, 2724, 5258, 1382, 6986, 799, 1875,	1381, 5212, 3380, 693, 5967, 3074, 732, 3477, 4601, 7479, 7438,	766, 4800, 6601, 5165, 3411, 5130, 584, 6026, 1740, 4907, 7153,	4232, 4740, 2508, 3844, 7362, 405, 4784, 1996, 6812, 1633, 5881, 4781, 2063, 198, 6094, 7462, 3501, 3188, 6801, 6526, 5417, 4608, 3566, 1886, 2573, 6461, 2563, 4556, 2819, 3789, 1402, 3141, 4501, 257, 6203, 1003, 1853, 3041, 4837, 1408, 6637, 2722, 993, 2880,	4149, 6266, 1682, 3078, 2562, 648, 4582, 6974, 2990, 2681, 1438, 3901, 6556, 417, 2593, 2044, 5729, 6090, 5653, 5833, 7131, 1228, 1097, 62, 5322, 6077, 3546, 5731, 6552, 398, 5422, 201, 3626, 5702,	4806, 1607, 1667, 5998, 1968, 2583, 2689, 7012, 5013, 5977, 3882, 6918, 413, 2799, 1656, 185, 3987, 7360, 2922, 2358, 3445, 4600,	7587, 3394, 1193, 2996, 3452, 1035, 1131, 542, 2173, 4561, 1266, 6244, 6979, 506, 1065, 2838, 296, 1406, 5722, 2169, 5309, 4095,	3139, 5484, 4924, 346, 4675, 5669, 1230, 2002, 1876, 217, 3265,	2067, 4730, 856, 7570, 1393, 3615, 4544, 5010, 4595, 1459, 1784, 1994, 5631, 6888, 5200, 5571, 1499, 6024, 1717, 5906, 1170, 5286, 5956, 5796, 4488, 2433, 2717, 2546, 572, 536, 738, 7352, 4198, 335,	2805, 4401, 7463, 118, 1897, 3765, 4442, 4431, 6492, 5224, 1771, 7568, 2252, 1036, 4921, 4665, 3751, 7060, 2811, 7146, 3832, 1872, 1211, 4841, 639, 4305, 7007, 6566
];
var bitRev_psiInv_7681_256 = [
	1, 3383, 1925, 6468, 7098, 1728, 6832, 527, 2446, 2381, 97, 5549, 2648, 2138, 4897, 6315, 7006, 5413, 6395, 4589, 1794, 1112, 4681, 5282, 365, 5835, 3654, 2753, 2273, 878, 5036, 330, 5173, 2941, 3449, 528, 2774, 5941, 1655, 7097, 2551, 4270, 2516, 1080, 2881, 6915, 243, 202, 3080,	4204, 6949, 4607, 1714, 6988, 4301, 2469, 6300, 5806, 6882, 695, 6299, 2423, 4957, 1908, 6584, 6453, 550, 1848, 2028, 1591, 1952, 5637, 5088, 7264, 1125, 3780, 6243, 5000, 4691, 707, 3099, 7033, 5119, 4603, 5999, 1415, 3532, 4801, 6688, 4959, 1044, 6273, 2844, 4640, 5828, 6678, 1478, 7424, 3180, 4540, 6279, 3892, 4862, 3125, 5118, 1220, 5108, 5795, 4115, 3073, 2264, 1155, 880, 4493, 4180, 219, 1587, 7483, 5618, 2900, 1800, 6048, 869, 5685, 2897, 7276,	319, 3837, 1115, 674, 3376, 7042, 2840, 6470, 5809, 3849, 535, 4870, 621, 3930, 3016, 2760, 6645, 5429, 113, 5910, 2457, 1189,	3250, 3239, 3916, 5784, 7563, 218, 3280, 4876, 7346, 3483, 329,	6943, 7145, 7109, 5135, 4964, 5248, 3193, 1885, 1725, 2395, 6511, 1775, 5964, 1657, 6182, 2110, 2481, 793, 2050, 5687, 5897, 6222, 3086, 2671, 3137, 4066, 6288, 111, 6825, 2951, 5614, 4416, 7464, 5805, 5679, 6451, 2012, 3006, 7335, 2757, 2197, 4542, 3586, 2372, 5512, 1959, 6275, 7385, 4843, 6616, 7175, 702, 1437, 6415, 3120, 5508, 7139, 6550, 6646, 4229, 4685, 6488, 4287, 94, 3081, 4236,	5323, 4759, 321, 3694, 7496, 6025, 4882, 7268, 763, 3799, 1704,	2668, 669, 4992, 5098, 5713, 1683, 6014, 6074, 2875, 1979, 4055, 7480, 2259, 7283, 1129, 1950, 4135, 1604, 2359, 7619
];
//=============================== compression and decompression ===============================
function compress2d(modulus, q, v) {
	if (modulus <= 0) {
		alert("modulus not positive");
		return;
	}
	
	var vector = copyOf(v.slice(), v.length);
	for (var j = 0; j < n; j++) {
		vector[j] = Math.round(vector[j] * 1.0 * modulus / q);
		if (modulus == 2048) {
			vector[j] = vector[j] & 2047;
		} 
		else if (modulus == 8) {
			vector[j] = vector[j] & 7;
		} 
		else {
			vector[j] %= modulus;
			if (vector[j] < 0) {
				vector[j] += modulus;
			}
		}
	}
	return vector;
}

function decompress2d(pow2d, q, v) {
	var vector = copyOf(v.slice(), v.length);
	for (var j = 0; j < n; j++) {
		vector[j] = Math.round(vector[j] * 1.0 * q / pow2d);
	}
	return vector;
}
//========================================================================
function NTT(A, n) {
	var NTT_A_COEFF = copyOf(A.slice(), n);
	var t = n;
	for (var m = 1; m < n; m<<=1) {
		t>>=1;
		for (var i = 0; i < m; i++) {
			var j1 = (i<<1) * t;
			var j2 = j1 + t - 1;
			var S = bitRev_psi_7681_256[m+i];
			for (var j = j1; j <= j2; j++) {
				var U = NTT_A_COEFF[j];
				var V = NTT_A_COEFF[j+t] * S;
				NTT_A_COEFF[j] = (U + V) % q;
				while(NTT_A_COEFF[j] < 0) {
					NTT_A_COEFF[j] = NTT_A_COEFF[j] + q;
				}
				NTT_A_COEFF[j+t] = (U - V) % q;
				while(NTT_A_COEFF[j+t] < 0) {
					NTT_A_COEFF[j+t] = NTT_A_COEFF[j+t] + q;
				}
			}
		}
	}
	return NTT_A_COEFF;
}

function INTT(A, n) {
	var NTT_A_COEFF = copyOf(A.slice(), n);
	var t = 1;
	for (var m = n; m > 1; m>>=1)	{
		var j1 = 0;
		var h = (m>>1);
		for (var i = 0; i < h; i++) {
			var j2 = j1 + t - 1;
			var S = bitRev_psiInv_7681_256[h+i];
			for (var j = j1; j <= j2; j++) {
				var U = NTT_A_COEFF[j];
				var V = NTT_A_COEFF[j+t];
				NTT_A_COEFF[j] = (U + V) % q;
				while(NTT_A_COEFF[j] < 0) {
					NTT_A_COEFF[j] = NTT_A_COEFF[j] + q;
				}
				var temp = U - V;
				while(temp < 0) {
					temp += q;
				}
				NTT_A_COEFF[j+t] = (temp * S) % q;
			}
			j1 = j1 + (t<<1);
		}
		t<<=1;
	}
	for (var j = 0; j < n; j++) {
		NTT_A_COEFF[j] = (NTT_A_COEFF[j] * INVN) % q;
	}
	return NTT_A_COEFF;
}
//--------------------------------------------------------------------------------------
function nextInt(q) {
	return Math.floor(random() * q);	//prng.js -> random()
}

function getBit (decimal_a, index) {
	return (decimal_a >> index) & 1;
}

//returns a copy of the original array, truncated or padded with zeros to obtain the specified length
function copyOf(arr1, length) {
	var arr2 = new Array(length);
	//var arr2 = [];
	for (var i = 0; i < length; i++) {
		if (i >= arr1.length) {
			arr2[i] = 0;
		} else {
			arr2[i] = arr1[i];
		}
	}
	return arr2;
}

function testBinomialSample (value) {
	var sum = 0;
	sum = (getBit(value, 0) - getBit(value, 4)) +
		(getBit(value, 1) - getBit(value, 5)) +
		(getBit(value, 2) - getBit(value, 6)) +
		(getBit(value, 3) - getBit(value, 7));			
	return sum;  
}
//================================================================================================
var ntt_a00;
var ntt_a01;
var ntt_a02;
var ntt_a10;
var ntt_a11;
var ntt_a12;
var ntt_a20;
var ntt_a21;
var ntt_a22;

var plaintext = new Array(n);
var ntt_m_3841 = new Array(n);

var ntt_s00;
var ntt_s01;
var ntt_s02;
var ntt_e00;
var ntt_e01;
var ntt_e02;
var ntt_b00 = new Array(n);
var ntt_b01 = new Array(n);
var ntt_b02 = new Array(n);
var b00;
var b01;
var b02;

var ntt_r00;
var ntt_r01;
var ntt_r02;
var ntt_e100;
var ntt_e101;
var ntt_e102;
var ntt_e200;

var ntt_c100 = new Array(n);
var ntt_c101 = new Array(n);
var ntt_c102 = new Array(n);
var ntt_c200 = new Array(n);
var c100;
var c101;
var c102;
var c200;

var ntt_v00 = new Array(n);
var v00;
//------------------------------------------- keyGeneration -------------------------------------------
function keyGeneration() {
	var s00 = new Array(n);
	var s01 = new Array(n);
	var s02 = new Array(n);
	var e00 = new Array(n);
	var e01 = new Array(n);
	var e02 = new Array(n);
	
	for (var i = 0; i < n; i++) {
		s00[i] = testBinomialSample(nextInt(n));
		s01[i] = testBinomialSample(nextInt(n));
		s02[i] = testBinomialSample(nextInt(n));
		e00[i] = testBinomialSample(nextInt(n));
		e01[i] = testBinomialSample(nextInt(n));
		e02[i] = testBinomialSample(nextInt(n));
	}
	ntt_s00 = NTT(s00, s00.length);
	ntt_s01 = NTT(s01, s01.length);
	ntt_s02 = NTT(s02, s02.length);
	ntt_e00 = NTT(e00, e00.length);
	ntt_e01 = NTT(e01, e01.length);
	ntt_e02 = NTT(e02, e02.length);
	
	for (var i = 0; i < n; i++) {
		// Component multiply; point-wise multiplication
		var x1 = (ntt_s00[i] * ntt_a00[i]);
		var x2 = (ntt_s01[i] * ntt_a01[i]);
		var x3 = (ntt_s02[i] * ntt_a02[i]);
		ntt_b00[i] = (x1 + x2 + x3 + ntt_e00[i]) % q;
		
		x1 = (ntt_s00[i] * ntt_a10[i]);
		x2 = (ntt_s01[i] * ntt_a11[i]);
		x3 = (ntt_s02[i] * ntt_a12[i]);
		ntt_b01[i] = (x1 + x2 + x3 + ntt_e01[i]) % q;
		
		x1 = (ntt_s00[i] * ntt_a20[i]);
		x2 = (ntt_s01[i] * ntt_a21[i]);
		x3 = (ntt_s02[i] * ntt_a22[i]);
		ntt_b02[i] = (x1 + x2 + x3 + ntt_e02[i]) % q;
		
	}
	var temp_b00 = INTT(ntt_b00, ntt_b00.length);
	var temp_b01 = INTT(ntt_b01, ntt_b01.length);
	var temp_b02 = INTT(ntt_b02, ntt_b02.length);
	b00 = compress2d(2048, q, temp_b00);
	b01 = compress2d(2048, q, temp_b01);
	b02 = compress2d(2048, q, temp_b02);
}

//------------------------------------------- encryption -------------------------------------------
function encrypt() {
	var temp_b00 = decompress2d(2048, q, b00);
	var temp_b01 = decompress2d(2048, q, b01);
	var temp_b02 = decompress2d(2048, q, b02);
	
	var r00 = new Array(n);
	var r01 = new Array(n);
	var r02 = new Array(n);
	var e100 = new Array(n);
	var e101 = new Array(n);
	var e102 = new Array(n);
	var e200 = new Array(n);
	
	for (var i = 0; i < n; i++) {
		r00[i] = testBinomialSample(nextInt(n));
		r01[i] = testBinomialSample(nextInt(n));
		r02[i] = testBinomialSample(nextInt(n));
		e100[i] = testBinomialSample(nextInt(n));
		e101[i] = testBinomialSample(nextInt(n));
		e102[i] = testBinomialSample(nextInt(n));
		e200[i] = testBinomialSample(nextInt(n));
	}
	ntt_r00 = NTT(r00, r00.length);
	ntt_r01 = NTT(r01, r01.length);
	ntt_r02 = NTT(r02, r02.length);
	ntt_e100 = NTT(e100, e100.length);
	ntt_e101 = NTT(e101, e101.length);
	ntt_e102 = NTT(e102, e102.length);
	ntt_e200 = NTT(e200, e200.length);
	
	ntt_b00 = NTT(temp_b00, temp_b00.length);
	ntt_b01 = NTT(temp_b01, temp_b01.length);
	ntt_b02 = NTT(temp_b02, temp_b02.length);	

	for (var i = 0; i < n; i++) {
		// Component multiply; point-wise multiplication
		var x1 = (ntt_r00[i] * ntt_a00[i]);
		var x2 = (ntt_r01[i] * ntt_a10[i]);
		var x3 = (ntt_r02[i] * ntt_a20[i]);
		ntt_c100[i] = (x1 + x2 + x3 + ntt_e100[i]) % q;
		
		x1 = (ntt_r00[i] * ntt_a01[i]);
		x2 = (ntt_r01[i] * ntt_a11[i]);
		x3 = (ntt_r02[i] * ntt_a21[i]);
		ntt_c101[i] = (x1 + x2 + x3 + ntt_e101[i]) % q;	
		
		x1 = (ntt_r00[i] * ntt_a02[i]);
		x2 = (ntt_r01[i] * ntt_a12[i]);
		x3 = (ntt_r02[i] * ntt_a22[i]);
		ntt_c102[i] = (x1 + x2 + x3 + ntt_e102[i]) % q;
		
		x1 = (ntt_r00[i] * ntt_b00[i]);
		x2 = (ntt_r01[i] * ntt_b01[i]);
		x3 = (ntt_r02[i] * ntt_b02[i]);
		ntt_c200[i] = (x1 + x2 + x3 + ntt_e200[i] + ntt_m_3841[i]) % q;
	}
	
	var temp_c100 = INTT(ntt_c100, ntt_c100.length);
	var temp_c101 = INTT(ntt_c101, ntt_c101.length);
	var temp_c102 = INTT(ntt_c102, ntt_c102.length);
	var temp_c200 = INTT(ntt_c200, ntt_c200.length);

	c100 = compress2d(2048, q, temp_c100);
	c101 = compress2d(2048, q, temp_c101);
	c102 = compress2d(2048, q, temp_c102);
	c200 = compress2d(8, q, temp_c200);
}

//------------------------------------------- decryption -------------------------------------------
function decrypt() {
	var temp_c100 = decompress2d(2048, q, c100);
	var temp_c101 = decompress2d(2048, q, c101);
	var temp_c102 = decompress2d(2048, q, c102);
	var temp_c200 = decompress2d(8, q, c200);
	
	ntt_c100 = NTT(temp_c100, temp_c100.length);
	ntt_c101 = NTT(temp_c101, temp_c101.length);
	ntt_c102 = NTT(temp_c102, temp_c102.length);
	ntt_c200 = NTT(temp_c200, temp_c200.length);
	
	for (var i = 0; i < n; i++) {
		var x1 = (ntt_s00[i] * ntt_c100[i]);
		var x2 = (ntt_s01[i] * ntt_c101[i]);
		var x3 = (ntt_s02[i] * ntt_c102[i]);
		// v = c2 - f
		ntt_v00[i] = (ntt_c200[i] - (x1 + x2 + x3)) % q;
		while (ntt_v00[i] < 0) {
			ntt_v00[i] += q;
		}
	}
	var temp_v00 = INTT(ntt_v00, ntt_v00.length);	
	v00 = compress2d(2, q, temp_v00);
}
//=================================================================================================
var n = 256;
var k = 3;
var q = 7681;
var eta = 4;	// η = 4
var db = 11;
var dc1 = 11;
var dc2 = 3;
//-------------------------------------------start kyber-------------------------------------------
function testkyber() {
	print("Test Kyber:");
	print("Input:");
	print("n = " + n);
	print("k = " + k);
	print("q = " + q);
	print("η = " + eta);
	print("db = " + db);
	print("dc1 = " + dc1);
	print("dc2 = " + dc2);
	print("Output:");
	
	// public key A
	var a00 = new Array(n);
	var a01 = new Array(n);
	var a02 = new Array(n);
	var a10 = new Array(n);
	var a11 = new Array(n);
	var a12 = new Array(n);
	var a20 = new Array(n);
	var a21 = new Array(n);
	var a22 = new Array(n);
	
	var plaintext_3841 = new Array(n);
	for (var i = 0; i < n; i++) {
		a00[i] = nextInt(q);
		a01[i] = nextInt(q);
		a02[i] = nextInt(q);
		a10[i] = nextInt(q);
		a11[i] = nextInt(q);
		a12[i] = nextInt(q);
		a20[i] = nextInt(q);
		a21[i] = nextInt(q);
		a22[i] = nextInt(q);
		plaintext[i] = nextInt(2);
		plaintext_3841[i] = plaintext[i] * 3841;
	}
	ntt_a00 = NTT(a00, a00.length);
	ntt_a01 = NTT(a01, a01.length);
	ntt_a02 = NTT(a02, a02.length);
	ntt_a10 = NTT(a10, a10.length);
	ntt_a11 = NTT(a11, a11.length);
	ntt_a12 = NTT(a12, a12.length);
	ntt_a20 = NTT(a20, a20.length);
	ntt_a21 = NTT(a21, a21.length);
	ntt_a22 = NTT(a22, a22.length);
	ntt_m_3841 = NTT(plaintext_3841, plaintext_3841.length);

	keyGeneration();
	encrypt();
	decrypt();
	
	var km = plaintext.toString();
	var kv = v00.toString();
	
	print("plain text: " + km);
	print("result: " + kv);
	
	if(km == kv) {
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
testkyber();
