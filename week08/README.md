# Data Model

![alt text](https://github.com/noalarms/data-structures/blob/master/week08/data%20structures%20week8%20diagram.png "screenshot")

# SQL Code

## Create

    CREATE TABLE sensordata (
        piezosensor int,
        tempsensor double precision,
        sensortime timestamp DEFAULT current_timestamp
    );

## Insert

    INSERT INTO sensordata VALUES (112, 16, DEFAULT);