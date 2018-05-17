int sensorPin = A0;
int rawValue;
float voltage;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  rawValue = analogRead(sensorPin);
  voltage = rawValue * (5.0 / 1023);
  Serial.println(voltage);
  delay(1500);
}
