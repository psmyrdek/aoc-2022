package main

import (
	"bufio"
	"container/list"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"
)

type Sensor struct {
	x    int
	y    int
	dist int
}

type Boundary struct {
	xMin int
	xMax int
	yMin int
	yMax int
}

func calcDist(x1, x2, y1, y2 int) int {

	v1 := 0
	v2 := 0

	if x1 > x2 {
		v1 = x1 - x2
	} else {
		v1 = x2 - x1
	}

	if y1 > y2 {
		v2 = y1 - y2
	} else {
		v2 = y2 - y1
	}

	return v1 + v2
}

func scanBoundary(wg *sync.WaitGroup, bd Boundary, sensors list.List, id int) {
	defer wg.Done()

	println("Starting worker ", id)

	for i := bd.xMin; i <= bd.xMax; i++ {
		for j := bd.yMin; j <= bd.yMax; j++ {

			matches := true

			for s := sensors.Front(); s != nil; s = s.Next() {
				sens := s.Value.(*Sensor)
				toPoint := calcDist(sens.x, i, sens.y, j)
				if sens.dist >= toPoint {
					matches = false
					break
				}
			}

			if matches {
				println(i, j)
				wg.Done()
				break
			}

		}

		println("Worker", id, "finished = ", i)
	}

	println("Finished worker ", id)
}

func createGrid(wg *sync.WaitGroup, sensor *Sensor) {
	defer wg.Done()

	items := 0

	println("X between", sensor.x-sensor.dist, "to", sensor.x+sensor.dist)
	println("Y between", sensor.y-sensor.dist, "to", sensor.y+sensor.dist)

	xLen := (sensor.x + sensor.dist) - (sensor.x - sensor.dist)
	yLen := (sensor.y + sensor.dist) - (sensor.y - sensor.dist)

	println("Possible items, grid width=", xLen, "height=", yLen, "can happen=", xLen*yLen < 16000000)

	for i := -sensor.dist; i <= sensor.dist; i++ {
		for j := -sensor.dist; j <= sensor.dist; j++ {

			// pointX := sensor.x + i
			// pointY := sensor.y + j

			items += 1

			// if pointX >= 0 && pointY >= 0 && pointX <= 4000000 && pointY <= 4000000 {
			// 	if calcDist(sensor.x, pointX, sensor.y, pointY) <= sensor.dist {
			// 		items += 1
			// 	}
			// }
		}
	}

	println("Worker done, found", items, "items", xLen*yLen)
}

func main() {
	readFile, err := os.Open("input.txt")

	if err != nil {
		fmt.Println(err)
	}
	fileScanner := bufio.NewScanner(readFile)

	fileScanner.Split(bufio.ScanLines)

	sensors := list.New()

	for fileScanner.Scan() {
		line := strings.Split(fileScanner.Text(), ": ")
		scannerCoords := strings.Split(line[0], ", ")
		beaconCoords := strings.Split(line[1], ", ")

		sX, _ := strconv.Atoi(scannerCoords[0])
		sY, _ := strconv.Atoi(scannerCoords[1])
		bX, _ := strconv.Atoi(beaconCoords[0])
		bY, _ := strconv.Atoi(beaconCoords[1])

		sensor := new(Sensor)
		sensor.x = sX
		sensor.y = sY
		sensor.dist = calcDist(sX, bX, sY, bY)

		sensors.PushFront(sensor)
	}

	readFile.Close()

	var wg sync.WaitGroup

	for s := sensors.Front(); s != nil; s = s.Next() {
		wg.Add(1)
		sens := s.Value.(*Sensor)
		go createGrid(&wg, sens)
	}

	wg.Wait()

	// boundaries := make([]Boundary, 20)

	// for i := 0; i < 5; i++ {
	// 	for j := 0; j < 5; j++ {
	// 		boundaries[i*5+j] = Boundary{
	// 			xMin: i * 200000,
	// 			xMax: (i+1)*200000 - 1,
	// 			yMin: j * 200000,
	// 			yMax: (j+1)*200000 - 1,
	// 		}
	// 	}
	// }

	// var wg sync.WaitGroup

	// for i, bd := range boundaries {
	// 	wg.Add(1)
	// 	go scanBoundary(&wg, bd, *sensors, i)
	// }

	// wg.Wait()
	// println("Main: Completed")
}
