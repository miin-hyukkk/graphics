var gl;
var points;

window.onload = function init() {

    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {alert("WebGL isn't available");}

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    // clear buffer bit
    gl.clear( gl.COLOR_BUFFER_BIT );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var backgroundVertices1 = [ //sky
        vec2(-1, 1),
        vec2(-1, -1),
        vec2(1, 1),
        vec2(1, -1),
    ];
    var backgroundVertices2 = [ //ground
        vec2(-1, -0.03),
        vec2(-1, -1),
        vec2(1, -0.03),
        vec2(1, -1),
    ];

    var hexagonVertices = [
        //moon
        vec2(0.55, 0.95),
        vec2(0.55, 1.04),
        vec2(0.5, 1.1),
        vec2(0.4, 1.1),
        vec2(0.35, 1.04),
        vec2(0.35, 0.95),
        vec2(0.4, 0.9),
        vec2(0.5, 0.9),
        vec2(0.55, 0.95),

    ];

    var colors = [//ground color
        vec4(0.0, 0.2, 0.0, 0),
        vec4(0.0, 0.2, 1.0, 0.5),
        vec4(0.0, 0.2, 1.0, 0.5),

    ];



    var tree = new Float32Array([ //tree
        //leaf
        0, 0.35,
        -0.15, 0.2,
        0.15, 0.2,

        0, 0.2,
        -0.15, 0.05,
        0.15, 0.05,

        0, 0.05,
        -0.15, -0.1,
        0.15, -0.1,
        //body
        -0.05, -0.1,
        0.05, -0.1,
        -0.05, -0.5,

        0.05, -0.1,
        -0.05, -0.5,
        0.05, -0.5
    ]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//sky

    // create a buffer on gpu and bind point

    // Associate out shader variables with our data buffer
    // attribute variable



    // attribute variable


    var kColor = gl.getUniformLocation(program, "color");

    //render

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ground


    var backgroundBufferId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBufferId2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(backgroundVertices2), gl.STATIC_DRAW);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.uniform4fv(kColor, [1.0, 1.0, 0.0, 1]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//달

    var hexagonBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, hexagonBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(hexagonVertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition); //연결해주는 부분

    gl.uniform4fv(kColor, [1.0, 1.0, 0.0, 1]);



    // uniform variable
    var offsetLoc = gl.getUniformLocation(program, "offset");
    gl.uniform4fv(offsetLoc, [0.2, -0.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 9);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//tree

    var bufferId1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);
    gl.bufferData(gl.ARRAY_BUFFER, tree, gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


//첫번째 나무
    gl.uniform4fv(kColor, [0.0, 0.8, 0, 0.5]);
    gl.uniform4fv(offsetLoc, [-0.5, 0, 0, 0]);//1
    gl.drawArrays(gl.TRIANGLES, 0, 9);
    gl.uniform4fv(kColor, [0.5, 0.25, 0.0, 1.0]);
    gl.drawArrays(gl.TRIANGLES, 9, 6);



//두번쨰나무
    gl.uniform4fv(offsetLoc, [0.7, 0.25, 0, 0]);
    gl.uniform4fv(kColor, [0.0, 0.8, 0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);
    gl.uniform4fv(kColor, [0.5, 0.25, 0.0, 1.0]);
    gl.drawArrays(gl.TRIANGLES, 9, 6);

    gl.uniform4fv(offsetLoc, [-0.9, 0.18, 0, 0]);
    gl.uniform4fv(kColor, [0.0, 0.8, 0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);
    gl.uniform4fv(kColor, [0.5, 0.25, 0.0, 1.0]);
    gl.drawArrays(gl.TRIANGLES, 9, 6);

    gl.uniform4fv(offsetLoc, [-0.1, 0.23, 0, 0]);
    gl.uniform4fv(kColor, [0.0, 0.8, 0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);
    gl.uniform4fv(kColor, [0.5, 0.25, 0.0, 1.0]);
    gl.drawArrays(gl.TRIANGLES, 9, 6);

    gl.uniform4fv(offsetLoc, [0.25, 0, 0, 0]);
    gl.uniform4fv(kColor, [0.0, 0.8, 0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);
    gl.uniform4fv(kColor, [0.5, 0.25, 0.0, 1.0]);
    gl.drawArrays(gl.TRIANGLES, 9, 6);



};
