SET FOREIGN_KEY_CHECKS=0;

drop table if exists Goal cascade;
drop table if exists Recommendation cascade;
drop table if exists Vegetarian cascade;
drop table if exists User cascade;
drop table if exists Activities;
drop table if exists Exercise_Activities;
drop table if exists Nutrition;
drop table if exists FoodNutrition;
drop table if exists Record_Hold;
drop table if exists Meal_Has_Food;
drop table if exists Favourite_1;
drop table if exists Favourite_2;
drop table if exists User_Do_Exercise;
drop table if exists Meal;
drop table if exists Eats;
drop table if exists Eats_Meal;

CREATE TABLE Goal ( 
  GoalId CHAR(10),
  Calories INTEGER NOT NULL,
  Protein INTEGER NOT NULL, 
  Fat INTEGER NOT NULL, 
  PRIMARY KEY(GoalID)
);

CREATE TABLE Recommendation ( 
  RecommendID CHAR(10) PRIMARY KEY,
  RecommendedFood VARCHAR(25) NOT NULL
);

create table User (
  UID char(10) PRIMARY KEY,
  Name varchar(25),
  Weight integer NOT NULL,
  Height integer NOT NULL,
  GoalId char(10) NULL, UNIQUE INDEX (GoalId),
  RecommendID char(10) NULL, UNIQUE INDEX (RecommendID),
  foreign key(GoalId)
    references Goal(GoalID)
    on delete set DEFAULT
    on update cascade,
  foreign key(RecommendID)
    references Recommendation(RecommendID)
    on delete set DEFAULT
    on update cascade
);

CREATE TABLE Vegetarian ( 
  UID CHAR(10) PRIMARY KEY,
  FOREIGN KEY(UID)
    REFERENCES User(UID)
    ON DELETE CASCADE 
);

CREATE TABLE Activities(
	ActivityName VARCHAR(25) primary key,
	CaloriesPerHour INTEGER NOT NULL
);

CREATE TABLE Exercise_Activities(
	Date DATE,
	ActivityName VARCHAR(25),
	Hours INTEGER NOT NULL,
	PRIMARY KEY(Date, ActivityName),
	FOREIGN KEY(ActivityName)
		REFERENCES Activities(ActivityName)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Nutrition(
	Protein INTEGER NOT NULL,
	Fat INTEGER NOT NULL,
Carb INTEGER NOT NULL,
Calorie INTEGER NOT NULL,
	PRIMARY KEY(Protein,Fat,Carb));

CREATE TABLE FoodNutrition(
	Protein INTEGER NOT NULL,
	Fat INTEGER NOT NULL,
Carb INTEGER NOT NULL,
FoodName VARCHAR(25) primary key
);

CREATE TABLE Record_Hold( 
	RecordID CHAR(10) primary key,
	UID CHAR(10) NOT NULL,
	Date DATE NOT NULL,
	Calories INTEGER NOT NULL,
	Protein INTEGER NOT NULL,
	Fat INTEGER NOT NULL,
	FOREIGN KEY(UID)
		REFERENCES User(UID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Meal(
  MealName VARCHAR(25) PRIMARY KEY
);

CREATE TABLE Meal_Has_Food(
	MealName VARCHAR(25),
	FoodName VARCHAR(25),
	PRIMARY KEY(MealName, FoodName),
	FOREIGN KEY(FoodName)
		REFERENCES FoodNutrition(FoodName)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
  FOREIGN KEY(MealName)
		REFERENCES Meal(MealName)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Favourite_1(
	UID CHAR(10),
	FoodName VARCHAR(25),
	PRIMARY KEY(UID),
	FOREIGN KEY(UID)
		REFERENCES User(UID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Favourite_2 (
	FoodName VARCHAR(25),
	TypeFood VARCHAR(25),
	PRIMARY KEY(FoodName),
	FOREIGN KEY(FoodName)
		REFERENCES Food(FoodName)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE User_Do_Exercise(
	UID CHAR(10),
	Date DATE,
	ActivityName VARCHAR(25),
	PRIMARY KEY(Date,  UID, ActivityName),
	FOREIGN KEY(Date)
	REFERENCES Exercise_Activities(Date)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY(UID)
	REFERENCES User(UID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
FOREIGN KEY(ActivityName)
	REFERENCES Activities(ActivityName)
	ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Eats(
	UID CHAR(10),
	MealName VARCHAR(25),	
	Date DATE,
	Amount INTEGER,
	PRIMARY KEY(UID, MealName,Date),
	FOREIGN KEY(UID)
		REFERENCES User(UID)
    ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY(MealName)
		REFERENCES Meal(MealName)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


INSERT INTO User(UID, Name, Weight, Height) VALUES ('u1', 'John', 70, 167);
INSERT INTO User(UID, Name, Weight, Height) VALUES ('u2', 'Ubada', 80, 170); 
INSERT INTO User(UID, Name, Weight, Height) VALUES ('u3', 'Hieu', 65, 185); 
INSERT INTO User(UID, Name, Weight, Height) VALUES ('u4', 'Nam', 75, 182); 
INSERT INTO User(UID, Name, Weight, Height) VALUES ('u5', 'Mark', 65, 160); 
INSERT INTO User(UID, Name, Weight, Height) VALUES ('u6', 'Jake', 100, 200); 
INSERT INTO User(UID, Name, Weight, Height) VALUES ('u7', 'Raymond', 50, 150);
INSERT INTO Vegetarian(UID) VALUES ('u1'); 
INSERT INTO Vegetarian(UID) VALUES ('u6'); 
INSERT INTO Vegetarian(UID) VALUES ('u7'); 
INSERT INTO Vegetarian(UID) VALUES ('u5'); 
INSERT INTO Vegetarian(UID) VALUES ('u3');

INSERT INTO Activities(ActivityName, CaloriesPerHour) Values('Cycling', 300);
INSERT INTO Activities(ActivityName, CaloriesPerHour) Values('Running', 700);
INSERT INTO Activities(ActivityName, CaloriesPerHour) Values('Weightlifting', 180);
INSERT INTO Activities(ActivityName, CaloriesPerHour) Values('Basketball', 650);
INSERT INTO Activities(ActivityName, CaloriesPerHour) Values('Swimming', 650);

INSERT INTO Exercise_Activities (Date, ActivityName, Hours) VALUES ('2024-02-27', 'Cycling', 1);
INSERT INTO Exercise_Activities (Date, ActivityName, Hours) VALUES ('2024-02-27', 'Running', 0.25);
INSERT INTO Exercise_Activities (Date, ActivityName, Hours) VALUES ('2024-02-28', 'Weightlifting', 2);
INSERT INTO Exercise_Activities (Date, ActivityName, Hours) VALUES ('2024-03-01', 'Swimming', 0.5);
INSERT INTO Exercise_Activities (Date, ActivityName, Hours) VALUES ('2024-03-02', 'Basketball', 3);

INSERT INTO User_Do_Exercise (UID, Date, ActivityName) VALUES ('u2', '2024-02-27', 'Cycling');
INSERT INTO User_Do_Exercise (UID, Date, ActivityName) VALUES ('u3', '2024-02-27', 'Running');
INSERT INTO User_Do_Exercise (UID, Date, ActivityName) VALUES ('u2', '2024-02-28', 'Weightlifting');
INSERT INTO User_Do_Exercise (UID, Date, ActivityName) VALUES ('u6', '2024-03-02', 'Basketball');
INSERT INTO User_Do_Exercise (UID, Date, ActivityName) VALUES ('u5', '2024-03-01', 'Swimming');

INSERT INTO Record_Hold(RecordID, UID, Date, Calories, Protein, Fat) VALUES ('r1', 'u1', '2024-03-01', 1500, 90, 25);
INSERT INTO Record_Hold(RecordID, UID, Date, Calories, Protein, Fat) VALUES  ('r2', 'u3', '2024-03-01', 2250, 120, 15);
INSERT INTO Record_Hold(RecordID, UID, Date, Calories, Protein, Fat) VALUES  ('r3', 'u2', '2024-03-01', 2000, 75, 10);
INSERT INTO Record_Hold(RecordID, UID, Date, Calories, Protein, Fat) VALUES  ('r4', 'u5', '2024-03-01', 1850, 50, 30);
INSERT INTO Record_Hold(RecordID, UID, Date, Calories, Protein, Fat) VALUES  ('r5', 'u6', '2024-03-01', 2600, 120, 25);

INSERT INTO Goal(GoalID, Calories, Protein, Fat) VALUES  ('g1', 2750, 120, 25);
INSERT INTO Goal(GoalID, Calories, Protein, Fat) VALUES  ('g2', 2000, 90, 25);
INSERT INTO Goal(GoalID, Calories, Protein, Fat) VALUES  ('g3', 1800, 75, 30);
INSERT INTO Goal(GoalID, Calories, Protein, Fat) VALUES  ('g4', 2500, 100, 35);
INSERT INTO Goal(GoalID, Calories, Protein, Fat) VALUES  ('g5', 3000, 200, 25);

INSERT INTO Recommendation(RecommendID, RecommendedFood) VALUES ('reco1', 'Chicken');
INSERT INTO Recommendation(RecommendID, RecommendedFood) VALUES ('reco2', 'Broccoli');
INSERT INTO Recommendation(RecommendID, RecommendedFood) VALUES ('reco3', 'Beef');
INSERT INTO Recommendation(RecommendID, RecommendedFood) VALUES ('reco4', 'Apple');
INSERT INTO Recommendation(RecommendID, RecommendedFood) VALUES ('reco5', 'Rice');

UPDATE User
SET GoalID = 'g1', RecommendID = 'reco1' 
WHERE UID = 'u1';

UPDATE User
SET GoalID = 'g2', RecommendID = 'reco2' 
WHERE UID = 'u7';

UPDATE User
SET GoalID = 'g3', RecommendID = 'reco3' 
WHERE UID = 'u3';

UPDATE User
SET GoalID = 'g4', RecommendID = 'reco4'
WHERE UID = 'u6';

UPDATE User
SET GoalID = 'g5', RecommendID = 'reco5'
 WHERE UID = 'u5';

INSERT INTO Favourite_1(UID, FoodName) VALUES  ('u1', 'Broccoli');
INSERT INTO Favourite_1(UID, FoodName) VALUES  ('u2', 'Chicken');
INSERT INTO Favourite_1(UID, FoodName) VALUES  ('u3', 'Apple');
INSERT INTO Favourite_1(UID, FoodName) VALUES  ('u6', 'Tofu');
INSERT INTO Favourite_1(UID, FoodName) VALUES  ('u5', 'Rice');

INSERT INTO Favourite_2(FoodName, TypeFood) VALUES  ('Chicken', 'Meat');
INSERT INTO Favourite_2(FoodName, TypeFood) VALUES  ('Broccoli', 'Vegetable');
INSERT INTO Favourite_2(FoodName, TypeFood) VALUES  ('Apple', 'Fruit');
INSERT INTO Favourite_2(FoodName, TypeFood) VALUES  ('Tofu', 'Vegetable');
INSERT INTO Favourite_2(FoodName, TypeFood) VALUES  ('Rice', 'Vegetable');

INSERT INTO Meal(MealName) VALUES ('Chicken Stir-Fry');
INSERT INTO Meal(MealName) VALUES ('Tofu Rice');
INSERT INTO Meal(MealName) VALUES ('Grilled Chicken');
INSERT INTO Meal(MealName) VALUES ('Fruit Salad');
INSERT INTO Meal(MealName) VALUES ('Spaghetti');
INSERT INTO Meal(MealName) VALUES ('Burger');

INSERT INTO Meal_Has_Food(MealName, FoodName) VALUES  ('Chicken Stir-Fry', 'Chicken');
INSERT INTO Meal_Has_Food(MealName, FoodName) VALUES  ('Chicken Stir-Fry', 'Broccoli');
INSERT INTO Meal_Has_Food(MealName, FoodName) VALUES  ('Tofu Rice', 'Tofu');
INSERT INTO Meal_Has_Food(MealName, FoodName) VALUES  ('Tofu Rice', 'Rice');
INSERT INTO Meal_Has_Food(MealName, FoodName) VALUES  ('Grilled Chicken', 'Chicken');
INSERT INTO Meal_Has_Food(MealName, FoodName) VALUES ('Fruit Salad', 'Apple');
INSERT INTO Meal_Has_Food(MealName, FoodName) VALUES ('Fruit Salad', 'Banana');
INSERT INTO Meal_Has_Food (MealName, FoodName) VALUES ('Spaghetti', 'Pasta');
INSERT INTO Meal_Has_Food (MealName, FoodName) VALUES ('Spaghetti', 'Tomato');
INSERT INTO Meal_Has_Food (MealName, FoodName) VALUES ('Spaghetti', 'Beef');
INSERT INTO Meal_Has_Food (MealName, FoodName) VALUES ('Burger', 'Beef');
INSERT INTO Meal_Has_Food (MealName, FoodName) VALUES ('Burger', 'Bun');

INSERT INTO Eats(UID, MealName, Date, Amount) VALUES ('u1', 'Chicken Stir-Fry', '2024-03-01', 250);
INSERT INTO Eats(UID, MealName, Date, Amount) VALUES ('u3', 'Tofu & Rice', '2024-04-28', 500);
INSERT INTO Eats(UID, MealName, Date, Amount) VALUES ('u3', 'Fruit Salad', '2024-03-02', 400);
INSERT INTO Eats(UID, MealName, Date, Amount) VALUES ('u2', 'Grilled Chicken', '2024-03-01', 750);
INSERT INTO Eats(UID, MealName, Date, Amount) VALUES ('u1', 'Fruit Salad', '2024-03-01', 650);

INSERT INTO Nutrition(Protein, Fat, Carb, Calorie) VALUES (25, 10, 40, 500);
INSERT INTO Nutrition(Protein, Fat, Carb, Calorie) VALUES (85, 70, 20, 1050);
INSERT INTO Nutrition(Protein, Fat, Carb, Calorie) VALUES (2, 70, 10, 678);
INSERT INTO Nutrition(Protein, Fat, Carb, Calorie) VALUES (100, 95, 20, 1335);
INSERT INTO Nutrition(Protein, Fat, Carb, Calorie) VALUES (10, 150, 20, 1050);
INSERT INTO Nutrition(Protein, Fat, Carb, Calorie) VALUES (40, 0, 10, 200);

INSERT INTO FoodNutrition(Protein, Fat, Carb, FoodName) VALUES (30, 4, 0, 'Chicken');
INSERT INTO FoodNutrition(Protein, Fat, Carb, FoodName) VALUES (9, 4, 2, 'Tofu');
INSERT INTO FoodNutrition(Protein, Fat, Carb, FoodName) VALUES (3, 1, 7, 'Broccoli');
INSERT INTO FoodNutrition(Protein, Fat, Carb, FoodName) VALUES (3, 1, 28, 'Rice');
INSERT INTO FoodNutrition(Protein, Fat, Carb, FoodName) VALUES (1, 0, 25, 'Apple');
INSERT INTO FoodNutrition(Protein, Fat, Carb, FoodName) VALUES (1, 0, 28, 'Banana');
INSERT INTO FoodNutrition (Protein, Fat, Carb, FoodName) VALUES (21, 19, 0, 'Beef');
INSERT INTO FoodNutrition (Protein, Fat, Carb, FoodName) VALUES (1, 0, 4, 'Tomato');
INSERT INTO FoodNutrition (Protein, Fat, Carb, FoodName) VALUES (5, 1, 33, 'Pasta');
INSERT INTO FoodNutrition (Protein, Fat, Carb, FoodName) VALUES (0, 4, 50, 'Bun');


