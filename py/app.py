import sys

if len(sys.argv) < 3:
  print("Usage: python app.py arg1 arg2")
  sys.exit(1)

name = sys.argv[0]

arg1 = sys.argv[1]

arg2 = sys.argv[2]

print(f"This is the name of the program {name}")
print("arg1:", arg1)
print("arg2:", arg2)