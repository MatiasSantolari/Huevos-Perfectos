let timer = document.getElementById("timer");
let eggImg = document.getElementById("egg");
let egg_crunch = document.getElementById("egg_crunch");
let alarm = document.getElementById("alarm_sound");
let countdown;

function startTimer(minutes){
    // 1️⃣ 🚨 Reiniciar temporizador si ya hay uno corriendo
    clearInterval(countdown); // Detiene cualquier temporizador activo
    timer.innerText = `Tiempo restante: ${minutes}:00`; // Resetear texto del timer

    // 2️⃣ 🥚 Restaurar el huevo a su estado original
    eggImg.src = "assets/egg_1.png"; // Vuelve a la imagen original (sin romper)
    gsap.set("#egg", { rotation: 0 }); // Restablecer cualquier animación previa

    // 3️⃣ ⏳ Iniciar nuevo temporizador
    let timeLeft = minutes * 60;
    countdown = setInterval(() => {
        timeLeft--; // Resto de a 1 segundo
        let mins = Math.floor(timeLeft / 60); // Me quedo con los minutos y redondeo
        let secs = timeLeft % 60; // Me quedo con el resto de esta division, es decir los segundos

        // Debido al intervalo que puse, cada 1 seg se actualizará el timer para mostrarselo al usuario
        timer.innerText = `Tiempo restante: ${mins}:${secs < 10 ? "0" : ""}${secs}`;

        if(timeLeft <= 0){
            clearInterval(countdown);
            finishTimer(); // Empieza la animación
        };
    },1000);
}


function finishTimer(){
    egg_crunch.play();

    //Animación con GSAP
    gsap.to("#egg", {
        duration: 1,
        rotation: 30,
        yoyo: true,
        onComplete: function() {
            egg_crunch.play();
            gsap.to("#egg", {
                duration: 1,
                rotation: -30,
                yoyo: true,
                onComplete: function() {
                    egg_crunch.play();
                    eggImg.src = "assets/egg_2.png";
                    gsap.to("#egg", {
                        duration: 1,
                        rotation: 30,
                        yoyo: true,
                        onComplete: function(){
                            egg_crunch.play();
                            eggImg.src = "assets/egg_3.png";
                            gsap.to("#egg", {
                                duration: 1,
                                rotation: 0,
                                yoyo: true,
                                onComplete: function() {
                                    egg_crunch.play();
                                    eggImg.src = "assets/egg_cracked_1.png";
                                    gsap.to("#egg", {
                                        duration: 1,
                                        onComplete: function() {
                                            alarm.play();
                                            setTimeout(() => {
                                                eggImg.src = "assets/egg_cracked_2.png";
                                            }, 1000);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });            
        }
    });
}




