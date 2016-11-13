#include <Wire.h>

//#include <CurieIMU.h>
//#include <BMI160.h>
//
//void setup() {
//  Serial.begin(9600);
//  while(!Serial);
//  CurieIMU.begin();
//  CurieIMU.setAccelerometerRange(2);
//}
//
//void loop() {
//  float ax, ay, az;
//  int axI;
//  CurieIMU.readAccelerometerScaled(ax, ay, az);
//  axI = (int)(ax * 10000);
//  Serial.write('A');
//  Serial.write("\n");
//
//}
#define MMA7660_ADDRESS 0x4C

void setup() {
  Serial.begin(9600);
  Wire.begin();       //Initiate the Wire library and join the I2C bus as a master  
  MMASEND(0x07,0x00); // Setting up MODE to Stand by to set SR
  MMASEND(0x06,0x10);
  MMASEND(0x08,0x00);  // Setting up SR register to 120 samples active and auto sleep mode
  MMASEND(0x07,0x01); //Setting up MODE Active to START measures
}

void loop() {
  Wire.beginTransmission(MMA7660_ADDRESS);
  Wire.write(0x00);  // register to read
  Wire.endTransmission();
  Wire.requestFrom(MMA7660_ADDRESS, 3); // read a byte

   if(Wire.available()){
        Serial.print(Wire.read());
        Serial.println();
   }
  
}

void MMASEND(unsigned char REG_ADDRESS, unsigned  char DATA){  //SEND data to MMA7660
  Wire.beginTransmission(MMA7660_ADDRESS);
  Wire.write(REG_ADDRESS);
  Wire.write(DATA);
  Wire.endTransmission();
}

