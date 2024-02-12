#include <iostream>
#include <stdio.h>

int main(int argc, char* argv[]) {
	try
	{
		if (argc < 3) throw 400;

		for (int i = 0; i < argc; i++) {
			printf("%d: %s\n", i, argv[i]);
		}

		printf("argc count is: %d", argc);
	}
	catch (int err)
	{
		printf("%d error: usage <operation> arg1 arg2", err);
	}

	return 0;
}