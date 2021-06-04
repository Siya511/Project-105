Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src=" '+data_uri+' ">';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/R91dltlIl/model.json',modelLoaded);//always add 'model.json' to the link taken from the teachable machine

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,result)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(result);
        document.getElementById("object_name").innerHTML = result[0].label;
        document.getElementById("object_accuracy").innerHTML = result[0].confidence.toFixed(3);

    }
}