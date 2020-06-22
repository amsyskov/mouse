def sensor_knopka_a():
    global event
    if input.button_is_pressed(Button.A):
        event = "START"
def sensor_udar():
    global i, event
    if 400 < abs(1000 - abs(input.acceleration(Dimension.STRENGTH))):
        i = i + 1
        event = "UDAR"
        serial.write_line("Udar")
        serial.write_number(i)
i = 0
event = ""
speed = 15
event = "NO"
images.icon_image(IconNames.HAPPY).show_image(0)

def on_forever():
    global event, speed
    if event == "NO":
        pass
    if event == "UDAR":
        event = "NO"
        maqueen.motor_stop(maqueen.Motors.ALL)
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 23)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 49)
        basic.pause(1000)
        maqueen.motor_stop(maqueen.Motors.ALL)
        event = "START"
    if event == "START":
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, speed)
        basic.pause(200)
        speed += 5
basic.forever(on_forever)

def on_forever2():
    sensor_udar()
    sensor_knopka_a()
basic.forever(on_forever2)
