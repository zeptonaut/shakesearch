build:
	go build -o bin/shakesearch main.go

clean:
	go clean
	rm -rf bin/*
