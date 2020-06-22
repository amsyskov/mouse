function sensor_knopka_a() {
    
    if (input.buttonIsPressed(Button.A)) {
        event = "START"
    }
    
}

function sensor_udar() {
    
    if (400 < Math.abs(1000 - Math.abs(input.acceleration(Dimension.Strength)))) {
        i = i + 1
        event = "UDAR"
        serial.writeLine("Udar")
        serial.writeNumber(i)
    }
    
}

let i = 0
let event = ""
let speed = 15
event = "NO"
images.iconImage(IconNames.Happy).showImage(0)
basic.forever(function on_forever() {
    
    if (event == "NO") {
        
    }
    
    if (event == "UDAR") {
        event = "NO"
        maqueen.motorStop(maqueen.Motors.All)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 23)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 49)
        basic.pause(1000)
        maqueen.motorStop(maqueen.Motors.All)
        event = "START"
    }
    
    if (event == "START") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
        basic.pause(200)
        speed += 5
    }
    
})
basic.forever(function on_forever2() {
    sensor_udar()
    sensor_knopka_a()
})
