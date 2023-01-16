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

			if i%1000 == 0 {
				println("Scanning row", i, "using worker", id)
			}

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

func main() {
	readFile, err := os.Open("../input.txt")

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

	boundaries := make([]Boundary, 25)

	for i := 0; i < 5; i++ {
		for j := 0; j < 5; j++ {
			boundaries[i*5+j] = Boundary{
				xMin: i * 200000,
				xMax: (i+1)*200000 - 1,
				yMin: j * 200000,
				yMax: (j+1)*200000 - 1,
			}
		}
	}

	var wg sync.WaitGroup

	for i, bd := range boundaries {
		wg.Add(1)
		go scanBoundary(&wg, bd, *sensors, i)
	}

	wg.Wait()
	println("Main: Completed")
}
