#include "math.h"
#define MMA7660_ADDRESS 0x4C


int redLED = D6;
int yelLED = D5;
int grn2LED = D4;
int grn1LED = D3;

int rPin = A3;
int gPin = A4;
int bPin = A5;

TCPClient client;
byte server[] = {192, 168, 1, 107};

const int BUFFER_SIZE = 3;
const int OUTLIER_THRESH = 30;
const int SAMPLES = 50;
const int CEIL = 62;
const int CEIL_TRIG = 45;
int xRead, yRead, zRead;
int buffInd = 0;
int netVect;

int xBuff[BUFFER_SIZE];
int yBuff[BUFFER_SIZE];
int zBuff[BUFFER_SIZE];

int xBuffAv[BUFFER_SIZE];
int yBuffAv[BUFFER_SIZE];
int zBuffAv[BUFFER_SIZE];

bool alert = false;

bool init = false;

int startSec = 0;

void setup() {
    pinMode(redLED, OUTPUT);
    pinMode(yelLED, OUTPUT);
    pinMode(grn2LED, OUTPUT);
    pinMode(grn1LED, OUTPUT);
    
    pinMode(rPin, OUTPUT);
    pinMode(gPin, OUTPUT);
    pinMode(bPin, OUTPUT);
    
  Serial.begin(9600);
  Wire.begin();       //Initiate the Wire library and join the I2C bus as a master 
  Wire.setSpeed(40000);
  delay(3000); 
  MMASEND(0x07,0x00); // Setting up MODE to Stand by to set SR
  MMASEND(0x06,0x10);
  MMASEND(0x08,0x00);  // Setting up SR register to 120 samples active and auto sleep mode
  MMASEND(0x07,0x01); //Setting up MODE Active to START measures
  
   if(!init) {
        for(int i = 0; i < BUFFER_SIZE; i++) {
            xBuff[i] = 30;
            yBuff[i] = 30;
            zBuff[i] = 30;
            xBuffAv[i] = 0;
            yBuffAv[i] = 0;
            zBuffAv[i] = 0;
        }
        init = true;
    }
    
    if (client.connect(server, 3031)) {
        Serial.println("TCP connection success");
        client.print(System.deviceID());
        client.println();
        
    } else {
        Serial.println("Connection to TCP server failed");
    }
    
    startSec = Time.now();
    
    writeRGB(255, 255, 255);
}


void loop() {
    int prevInd = prevBuffInd(buffInd);
    int prevprevInd = prevBuffInd(prevInd); 
    
    int sampXAv = 0;
    int sampYAv = 0;
    int sampZAv = 0;
    for(int i = 0; i < SAMPLES; i++) {
        Wire.beginTransmission(MMA7660_ADDRESS);
        Wire.write(0x00);  // register to read
        Wire.endTransmission();
        Wire.requestFrom(MMA7660_ADDRESS, 3); // read a byte
        if(Wire.available()){
           sampXAv += Wire.read();
           sampYAv += Wire.read();
           sampZAv += Wire.read();
          
        }
        
    }
 
   
   
   
    xBuff[buffInd] = sampXAv / SAMPLES;
    yBuff[buffInd] = sampYAv / SAMPLES;
    zBuff[buffInd] = sampZAv / SAMPLES;
   
   
   
   int runXA = runXAv();
   int runYA = runYAv();
   int runZA = runYAv();
   
   xBuffAv[buffInd] = runXA;
   yBuffAv[buffInd] = runYA;
   zBuffAv[buffInd] = runZA;
   int runXAdj = runXA;
   int runYAdj = runYA;
   int runZAdj = runZA;
   
   if(runXAvAv() > CEIL_TRIG) {
       runXAdj = CEIL - runXA;
   }
   if(runYAvAv() > CEIL_TRIG) {
       runYAdj = CEIL - runYA;
   }
   if(runZAvAv() > CEIL_TRIG) {
       runZAdj = CEIL - runZA;
   }
   runXAdj -= 7;
   runYAdj -= 7;
   runZAdj -= 7;
   
   
   netVect = sqrt(pow(runXAdj, 2) + pow(runYAdj, 2) + pow(runZAdj, 2));
   
   setLEDs(netVect);
   
   if (netVect < 5) {
       netVect = netVect / 10;
   } else if(netVect < 15) {
       netVect = netVect / 3;
   } else if(netVect < 25) {
       netVect = netVect / 1.5;
   } else {
       netVect = netVect / 1.1;
   }
    Serial.print(runXAdj);
    Serial.print("\t");
    Serial.print(runYAdj);
    Serial.print("\t");
    Serial.print(runZAdj);
    Serial.print("\t");
    Serial.print(netVect);
    Serial.print("\t");
    Serial.println();
    
    
    client.print((int)millis());
    client.print("\t");
    client.print(netVect);
    
    client.println();
        
    if(alert) {
        if(Time.now() % 2 == 0) {
            setRed();
        } else {
            clearRGB();
        }
    }
    
    while(client.available()) {
        setRed();
        if(client.read() == 'W') {
            alert = true;
        } else if(client.read() == 'C') {
            alert = false;
        }
    }
    
    buffInd = nextBuffInd(buffInd);
    delay(33);

}




void MMASEND(unsigned char REG_ADDRESS, unsigned  char DATA){  //SEND data to MMA7660
  Wire.beginTransmission(MMA7660_ADDRESS);
  Wire.write(REG_ADDRESS);
  Wire.write(DATA);
  Wire.endTransmission();
  Serial.print("Wrote:");
  Serial.print(REG_ADDRESS);
  Serial.print("\n");
}




int prevBuffInd(int ind) {
    int prevInd;
    if(ind == 0) {
        prevInd = BUFFER_SIZE - 1;
    } else {
        prevInd = ind - 1;
    }
    return prevInd;
}

int nextBuffInd(int ind) {
    int nextInd;
    if(ind == BUFFER_SIZE - 1) {
        nextInd = 0;
    } else {
        nextInd = ind + 1;
    }
    return nextInd;
}

int runXAv() {
    int sum;
    for(int i = 0; i < BUFFER_SIZE; i++) {
        sum += xBuff[i];
    }
    return sum / BUFFER_SIZE;
}

int runYAv() {
    int sum;
    for(int i = 0; i < BUFFER_SIZE; i++) {
        sum += yBuff[i];
    }
    return sum / BUFFER_SIZE;
}

int runZAv() {
    int sum;
    for(int i = 0; i < BUFFER_SIZE; i++) {
        sum += zBuff[i];
    }
    return sum / BUFFER_SIZE;
}



int runXAvAv() {
    int sum;
    for(int i = 0; i < BUFFER_SIZE; i++) {
        sum += xBuffAv[i];
    }
    return sum / BUFFER_SIZE;
}

int runYAvAv() {
    int sum;
    for(int i = 0; i < BUFFER_SIZE; i++) {
        sum += yBuffAv[i];
    }
    return sum / BUFFER_SIZE;
}

int runZAvAv() {
    int sum;
    for(int i = 0; i < BUFFER_SIZE; i++) {
        sum += zBuffAv[i];
    }
    return sum / BUFFER_SIZE;
}

void setLEDs(int val) {
    digitalWrite(redLED, LOW);
    digitalWrite(yelLED, LOW);
    digitalWrite(grn2LED, LOW);
    digitalWrite(grn1LED, LOW);
    
    if(val > 55) {
        digitalWrite(redLED, HIGH);
    }
    if(val > 40 ) {
        digitalWrite(yelLED, HIGH);
    }
    if(val > 20) {
        digitalWrite(grn2LED, HIGH);
    }
    if(val > 10) {
        digitalWrite(grn1LED, HIGH);
    }
}

void writeRGB(int rVal, int gVal, int bVal) {
    
    digitalWrite(rPin, rVal);
    analogWrite(gPin, gVal);
    analogWrite(bPin, bVal);
}

void setRed() {
    writeRGB(0, 127, 127);
}

void clearRGB() {
    writeRGB(255, 255, 255);
}



//eric's ip: 192.168.1.107;
//port 3031