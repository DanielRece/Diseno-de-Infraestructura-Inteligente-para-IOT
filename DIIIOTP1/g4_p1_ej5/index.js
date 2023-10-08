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
document.addEventListener('online', actualizarEstadoRedElectrica, false);
document.addEventListener('offline', actualizarEstadoRedElectrica, false);

function onDeviceReady() {
    console.log('deviceready event fired');
    // Cuando el dispositivo está listo, asociamos la función a ejecutar con el evento click del botón
    document.getElementById('botonFoto').addEventListener('click', tomarFoto);
    document.getElementById('botonGaleria').addEventListener('click', seleccionarFotoGaleria);

    //Mostrar estado de la bateria y de la conexion a la red electrica
    window.addEventListener('batterystatus', function(){
        actualizarEstadoBateria();
        actualizarEstadoRedElectrica();
    }, false);
    window.addEventListener('batterylow', mostrarBateriaBaja, false);
    window.addEventListener("batterycritical", mostrarBateriaCritica, false);

    window.navigator.getBattery().then(function (battery) {
        mostrarEstadoBateria(battery);
        mostrarEstadoRedElectrica(battery);
    });
}

function mostrarBateriaCritica() {
    alert('Nivel de bateria critico . Conecte el cargador');
    actualizarEstadoBateria();
}


function mostrarEstadoBateria(battery){
    var estadoBateria = document.getElementById('estadoBateria');
    estadoBateria.innerText = (battery.level * 100) + '%';

    //Obtener los botones
    var botonFoto = document.getElementById('botonFoto');
    var botonGaleria = document.getElementById('botonGaleria');

    if(battery.level <= 0.3 && !battery.charging){
        //Nivel de bateria baja y sin conectar a la red electrica
        botonFoto.disabled = true;
        botonGaleria.disabled = true;
    }else{
        //Nivel de bateria > 30 o con conexion a la red electrica
        botonFoto.disabled = false;
        botonGaleria.disabled = false;
    }
}


function mostrarBateriaBaja(){
    alert('Nivel de bateria bajo (menos del 30%). No se puede utilizar la camara');
    actualizarEstadoBateria();
}

function actualizarEstadoBateria(){
    window.navigator.getBattery().then(function(battery) {
        mostrarEstadoBateria(battery);
    });    
}

function actualizarEstadoRedElectrica(){
    window.navigator.getBattery().then(function(battery) {
        mostrarEstadoRedElectrica(battery);
    });    
}

function mostrarEstadoRedElectrica(battery){
    var estadoRedElectrica = document.getElementById('estadoRedElectrica');
    var botonFoto = document.getElementById('botonFoto');
    var botonGaleria = document.getElementById('botonGaleria');
    //Obtener los botones
    estadoRedElectrica.innerText = battery.charging ? 'Sí' : 'No';
    if(battery.level <= 0.3 && !battery.charging){
        //Nivel de bateria baja y sin conectar a la red electrica
        botonFoto.disabled = true;
        botonGaleria.disabled = true;
    }else{
        //Nivel de bateria > 30 o con conexion a la red electrica
        botonFoto.disabled = false;
        botonGaleria.disabled = false;
    };

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
