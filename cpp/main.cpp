#include <iostream>
#include "lib.h"

using namespace std;

int main() {
  int choice;

  do {
    menu();
    cin >> choice;
  } while (choice != 5);

  return 0;
}