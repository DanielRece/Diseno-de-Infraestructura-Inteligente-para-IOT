/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    // Cuando el dispositivo está listo, asociamos la función a ejecutar con el evento click del botón
    document.getElementById('botonFoto').addEventListener('click', tomarFoto);
    document.getElementById('botonGaleria').addEventListener('click', seleccionarFotoGaleria);
}


function tomarFoto() {
    // Opciones para configurar la cámara
    var options = {
        destinationType: Camera.DestinationType.DATA_URL, // FILE_URI para obtener la uri del archivo
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG, // Formato de imagen, que es JPEG
        targetHeight: 100,
        targetWidth: 100
    };

    // Se llama a la cámara para tomar la foto
    navigator.camera.getPicture(onSuccess, onError, options);
}

function onSuccess(imageData) {
    // Se muestra la foto en la pantalla
    var img = document.getElementById('foto');
    img.src = "data:image/jpeg;base64,"+imageData;
}

function onError(error) {
    console.error('Error al hacer la foto: ' + error);
}

function seleccionarFotoGaleria(){
    var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetHeight: 100,
        targetWidth: 100
    };

    //Se llama a la galeria para mostrar la foto
     navigator.camera.getPicture(onSuccess, onError, options);
}
