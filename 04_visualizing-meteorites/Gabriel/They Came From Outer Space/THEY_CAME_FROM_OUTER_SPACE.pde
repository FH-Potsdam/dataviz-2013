/* @pjs preload="verlauf.png"; 
 */

public GameManager gm;
public DataManager dm;

PImage motionBlur;

void setup() {
  motionBlur = loadImage("verlauf.png");

  size(1280, 768);
  colorMode(HSB, 255, 255, 255, 255);
  frameRate(120);
  dm = new DataManager();
  gm  = new GameManager();
}


void parseRow(var rowData, float progress) {
  dm.parseRow(rowData, progress);
}

void goToScene(int index) {
  gm.switchMode(index);
}

void drawProgessBar(String message, float progress) {
  background(0);
  rectMode(LEFT);
  noFill(); 
  stroke(255);
  rect(width/2, height/2, 200, 30);
  noStroke(); 
  fill(255);
  rect(width/2, height/2, progress*200, 30);
  text(message, width/2, height/4);
}


void draw() {

  rectMode(CENTER);
  background(0);
  gm.update();
  gm.render();

  text("FPS: " + frameRate, 20, 20);
  text("Meteorites in Memory: " + gm.meteorites.size(), 20, 40);
  text("Bullets in Memory: " + gm.bullets.size(), 20, 60);
  text("Debris in Memory: " + gm.debris.size(), 20, 80);
  text("Rockets in Memory: " + gm.rockets.size(), 20, 100);

  if (mousePressed && (gm.mode == 2) && (frameCount % 5 == 0)) {
    gm.bullets.add(gm.ship.shootBullet());
  }
}

void mousePressed() {

  switch(gm.mode) {

  case 0:
    break;

  case 1:
    dm.generateQueue();
    gm.loadQueue(dm.generatedQueue);
    gm.switchMode(2);
    break;
  case 2:
    break;
  case 3:
    break;
  }
}



void keyPressed() {
  //  switch(key) {
  //  }
}

class Bullet extends Projectile {

  boolean outOfViewport = false;
  boolean collided = false;
  float rotation;

  Bullet(PVector l) {

    location = l.get();
    velocity = new PVector(0, -5);
  }

  public void update() {
    super.update();
    rotation+=0.2;
    if (location.y < 0) {
      outOfViewport = true;
    }
  }

  public void hit() {
    collided = true;
  }

  public void render() {
    fill(20, 150, 200);
    pushMatrix();
    translate(location.x, location.y);
    rotate(rotation);
    rect(0, 0, 5, 5);
    popMatrix();
  }
}

class DataManager {

  HashMap years;
  ArrayList yearNumbers;
  ArrayList generatedQueue;

  DataManager() {
    years = new HashMap();
    yearNumbers = new ArrayList();
    generatedQueue = new ArrayList();
  }

  void parseRow(var rowData, float progress) {
    console.log("parseRow()");    
    if (years.get(rowData.year) == null) {
      Year yNew = new Year(rowData.year);
      yNew.addEntry(rowData);
      years.put(rowData.year, yNew);
      yearNumbers.add(rowData.year);
    } else {
      Year yExisting = (Year) years.get(rowData.year);
      yExisting.addEntry(rowData);
    }
  }

  public void generateQueue()
  {
    console.log("generateQueue()");    
    generatedQueue.clear();

    int yearStart = int( constrain( map(mouseX, 0, width, 0, years.size()-1), 0, years.size()-1 ) );
    int yearStop = int(constrain(map(mouseX, 0, width, 0, years.size()-1) + 30, 0, years.size()-1));

    // walk through all years
    for (int i=yearStart; i< yearStop ; i++)
    {
      Year y = years.get(yearNumbers.get(i));
      // walk through all meteorites
      for (int j=0; j<y.entries.size(); j++)
      {
        Meteorite m = new Meteorite(y.entries.get(j));
        m.setPosition(random(0, width), 0);
        generatedQueue.add(m);
      }
    }
  }
}

class Debris extends Projectile {


  float rotation, rotationSpeed;
  float size = 0;
  String content;

  int displayMode = 0;

  Debris(PVector l, float s) {
    displayMode = 0;
    location = l.get();
    rotationSpeed = random(0.001, 0.2);
    velocity = new PVector(random(-5, 5), random(0, 5));
    size = s/2;
  }
  
  void setText(String message) {
    displayMode = 1;
    rotationSpeed = random(0.01, 0.2);
    velocity = new PVector(random(-3, 3), random(-3, 3));
    content = message;
    size = 30;
  }

  public void update() {
    super.update();
    size-=1;
    rotation+=rotationSpeed;
  }

  public void render() {

    switch (displayMode) {

    case 0 :
      noStroke();
      fill(128);
      pushMatrix();
      translate(location.x, location.y);
      rotate(rotation);
      image(motionBlur, 0, 0, size, size);
      popMatrix();
      break;

    case 1:
      fill(128);
      pushMatrix();
      translate(location.x, location.y);
      rotate(rotation);
      textAlign(CENTER);
      text(content, 0, 0);
      popMatrix();
      break;
    }
  }
}

class GameManager {

  ArrayList bullets;
  ArrayList rockets;
  ArrayList debris;
  ArrayList queue;
  ArrayList meteorites;

  Ship ship;


  int queueTimestamp = 0;
  int queueIndex = 0;

  int mode = 0;
  // 0 titlescreen
  // 1 = meteorites-selection
  // 2 = battle
  // 3 = score

  GameManager() {
    meteorites = new ArrayList();
    queue = new ArrayList();
    bullets = new ArrayList();
    rockets = new ArrayList();
    debris = new ArrayList();
    ship = new Ship();
  }

  // takes care of easily switching between the screens 
  void switchMode(int index) {
    console.log("switchMode()");
    mode = index;
    switch (index) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      initBattle();
      music.play();
      break;
    }
  }

  void loadQueue(ArrayList newQueue)
  {
    console.log("loadQueue()");
    queue.clear();
    queue = newQueue;
  }

  void initBattle() {
    console.log("initBattle()");
    meteorites.clear();
    queueIndex = 0;
    queueTimestamp = millis() + 100;
  }


  public void createSpaceDebris(PVector location, int size)
  {
    Debris sDebris = new Debris(location, size);
    debris.add(sDebris);
  }

  public void createTextDebris(PVector location, String message)
  {
    Debris sDebris = new Debris(location, 100);
    sDebris.setText(message);
    debris.add(sDebris);
  }

  public void addMeteorite() {
    console.log("addMeteorite()");
    meteorites.add(queue.get(queueIndex));
  }


  public void updateBattle() 
  {
    console.log("updateBattle()");

    if ( (millis() > queueTimestamp) && (queueIndex < queue.size())) {
      addMeteorite();
      queueTimestamp = millis() + 1000;
      queueIndex++;
    }


    // debris
    for (int i=0; i<debris.size(); i++) { 
      Debris d = debris.get(i);
      d.update();
      // clear the meteoroid-list
      if (d.size <= 0) {
        debris.remove(i);
      }
    }


    // rockets
    for (int i=0; i<rockets.size(); i++) {
      Rocket r = rockets.get(i);
      r.update();
      r.locateTarget(meteorites);

      // CHECK FOR COLLISIONS
      Meteorite cMeteorite = r.collideWith(meteorites);
      if (cMeteorite != null) {
        cMeteorite.takeDamage();
        r.hit();
        createSpaceDebris(cMeteorite.location, cMeteorite.size);
        createSpaceDebris(cMeteorite.location, cMeteorite.size);
        createSpaceDebris(cMeteorite.location, cMeteorite.size);
      }

      // remove the rocket from the list
      if (r.outOfViewport || r.collided) {
        rockets.remove(i);
      }
    }

    // meteorites
    for (int i=0; i<meteorites.size(); i++) {
      m = meteorites.get(i);
      m.update();
      // clear the meteoroid-list
      if (m.location.y > height || m.destroyed == true) {
        int r = int(random(0, 2));
        switch(r) {
        case 0: 
          createTextDebris(m.location, "Place: " + m.data.place); 
          break;
        case 1: 
          createTextDebris(m.location, "Type: " + m.data.typeOfMeteorite); 
          break;
        case 2: 
          createTextDebris(m.location, (m.data.massInGram / 1000) + " Kilogram");
          break;
        }
        meteorites.remove(i);
      }
    }

    // bullets
    for (int i=0; i<bullets.size(); i++) {
      Bullet b = bullets.get(i);
      b.update();

      Meteorite cMeteorite = b.collideWith(meteorites);
      if (cMeteorite != null) {
        cMeteorite.takeDamage();
        b.hit();
        createSpaceDebris(cMeteorite.location, cMeteorite.size);
        createSpaceDebris(cMeteorite.location, cMeteorite.size);
        createSpaceDebris(cMeteorite.location, cMeteorite.size);
      }

      if (b.outOfViewport || b.collided) {
        bullets.remove(i);
      }
    }

    ship.update();
  }


  public void update() {
    switch(mode) {
      // the title screen
    case 0:
      break;
    case 1:
      //updateTimeLine();
      break;
    case 2:
      updateBattle();
      break;
    case 3:
      break;
    }
  }


  public void render() {
    switch(mode) {
      // the title screen
    case 0:
      text("THEY CAME FROM OUTER SPACE", width/2, height/2);
      break;
    case 1:
      renderTimeLine();
      text(dm.years.size(), width/2, height/2);
      break;
    case 2:
      renderBattle();
      break;
    case 3:
      break;
    }
  }


  void renderTimeLine() {
    beginShape();
    for (int i=0; i < dm.years.size(); i++ ) {
      stroke(255);
      Year y = (Year) dm.years.get(dm.yearNumbers.get(i));
      float xPos = map(i, 0, dm.yearNumbers.size(), 0, width);
      line(xPos, 0, xPos, y.entries.size()*10);
      noStroke();
    }
    endShape();
  }


  public void renderBattle() {
    for (int i=0; i<meteorites.size(); i++) { 
      m = meteorites.get(i);
      m.render();
    }

    for (int i=0; i<bullets.size(); i++) { 
      b = bullets.get(i);
      b.render();
    }

    // rockets
    for (int i=0; i<rockets.size(); i++) { 
      r = rockets.get(i);
      r.render();
    }

    for (int i=0; i<debris.size(); i++) { 
      d = debris.get(i);
      d.render();
    }

    ship.render();
  }
}

class Meteorite extends Projectile {
  
  RowData data;
  float size;
  boolean destroyed = false;

  Meteorite(RowData reference) 
  {
    data = reference;
    velocity = new PVector(0, random(0.5, 1));
    location = new PVector(random(0, width), 0);
    seed = random(0, 20);
    size = ((1 + data.massInGram) / 1000) + 10;
  }

  void update() {
    super.update();
    seed+=0.01;
  }

  void renderMotionblur() {
    image(motionBlur, location.x-size/2, location.y-size*3, size, size*3);
  }

  void render()
  {
    if (destroyed == false) {
      renderMotionblur();
      noStroke();
      fill(seed*15, 200, size*3);
      ellipse(location.x, location.y, size, size);
    }
  }

  void takeDamage() 
  {

    hits[int(random(0, 2))].play();

    if (destroyed == false) {
      if (size > 5) {
        size -= 5;
      } else {
        destroyed = true;
        explosions[int(random(0, 3))].play();
        println("destroyed");
      }
    }
  }
}

class Projectile {

  public PVector location;
  public PVector velocity;


  Projectile() {
    velocity = new PVector(0, 0);
    location = new PVector(0, 0);
  }


  public void setPosition(float x, float y)
  {
    location = new PVector(x, y);
  }


  public void update()
  {
    location.add(velocity);
  }



  public Projectile collideWith(ArrayList projectiles) {
    Projectile collidedProjectile = null;
    for (int i=0; i<projectiles.size(); i++) 
    {
      Projectile p = projectiles.get(i);
      if (PVector.dist(p.location, location) < p.size/2 + 5) {
        collidedProjectile = p;
      }
    }
    return collidedProjectile;
  }
}

class Rocket extends Projectile {

  boolean outOfViewport = false;
  boolean collided = false;
  float rotation;
  float nearestDistance = 200;
  float gas;
  Projectile target = null;


  Rocket (PVector l) {
    location = l.get();
    float theta = random(-PI, PI);
    velocity = new PVector(0, -5);
    gas = 255;
  }


  public void update() {
    super.update();
    rotation+=0.2;
    gas -= 2;

    if (gas <= 0) {
      hit();
    }

    if (location.y < 0) {
      outOfViewport = true;
    }
  }

  public void hit() {
    collided = true;
  }


  public void locateTarget(ArrayList projectiles) {

    nearestDistance = 200;

    for (int i=0; i<projectiles.size(); i++) {
      Projectile p = projectiles.get(i);

      PVector nextLocation = PVector.add(location, PVector.mult(velocity, 10));

      if (PVector.dist(p.location, nextLocation) < nearestDistance ) {
        nearestDistance = PVector.dist(p.location, location);
        target = p;
      }
    }

    // if there is a target (inside the detection-range), change direction
    if (target != null) {
      if (!target.destroyed) {
        PVector difference = PVector.sub(target.location, location);
        difference.normalize();
        difference.mult(3);
        velocity = difference.get();
      }
    }
  }


  public void render() {
    fill(255, gas, gas);
    pushMatrix();
    translate(location.x, location.y);
    rotate(rotation);
    rect(0, 0, 5, 5);
    popMatrix();
  }
}

class RowData {

  int fellFound = 0; // 0: normal, 1: destroyed by bullet
  boolean destroyed = false;
  String typeOfMeteorite;
  String place;
  String database;
  int year;
  float massInGram;
  float[] geolocation;
  float seed;


  RowData(var rowData) {
    if (rowData.fell_found == "Fell") {
      fellFound = 1;
    } else {
      fellFound = 0;
    }

    typeOfMeteorite = rowData.type_of_meteorite;
    place = rowData.place;
    database = rowData.database;
    year = rowData.year;
    massInGram = rowData.mass_g;
    
    //    geolocation[0] = rowData.coordinate_1;
    //    geolocation[1] = rowData.coordinate_2;
  }
}

class Ship extends Projectile {

  int hp = 100;

  Ship() {
  }


  public Bullet shootBullet() {
    Bullet bTemp = new Bullet(location);
    shoot.play();
    return bTemp;
  }

  public Rocket shootRocket() {
    Rocket rTemp = new Rocket(location);
    shoot.play();
    return rTemp;
  }



  public void update() {
    location = new PVector(mouseX, height-100);
  }

  public void render() {
    fill(255);
    //triangle(location.x, location.y-30, location.x+15, location.y, location.x-15, location.y);
    rect(location.x, location.y, 30, 30);
  }
}

class Year {

  int index;
  ArrayList entries;

  int weightSum; 

  Year(int year) {
    index = year;
    entries = new ArrayList();
  }


  void addEntry(var rowData) {
    RowData rNew = new RowData(rowData);
    entries.add(rNew);
  }

  void calculateStatistics() {
    for (int i=0; i<entries.length; i++) {
      weightSum += entries.get(i).mass_g;
    }
  }
}


