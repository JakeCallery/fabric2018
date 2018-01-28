bool fillingCommand = false;
int numCommandBytes = 0;
unsigned char commandBytes[5] = {0,0,0,0,0};

void setup() {
  // put your setup code here, to run once:
  Serial.begin(57600);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
}

void loop() {
  while(Serial.available()){
    int data = Serial.read();
    Serial.println(data);
    if(data == '1'){
      digitalWrite(LED_BUILTIN, HIGH);
    }

    if(data == '0'){
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
}
