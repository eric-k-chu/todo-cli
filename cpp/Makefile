all: notes
	rm -f main.o lib.o

notes: main.o lib.o
	g++ -o notes main.o lib.o

main.o: main.cpp
	g++ -c main.cpp

lib.o: lib.cpp lib.h
	g++ -c lib.cpp

clean:
	rm *.o notes