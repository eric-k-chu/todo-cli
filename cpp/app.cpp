#include <iostream>
#include <stdio.h>
#include "rapidjson/document.h"
#include "rapidjson/filereadstream.h"

using namespace rapidjson;

int main(int argc, char* argv[]) {
	try
	{
		FILE* fp = fopen("data.json", "rb");
		if (!fp) {
			std::cerr << "Failed to open file." << std::endl;
			return 1;
		}

		char buf[65536];
		FileReadStream is(fp, buf, sizeof(buf));

		fclose(fp);

		Document doc;
		doc.ParseStream(is);

		if (doc.HasParseError()) {
			std::cerr << "Parse error." << std::endl;
			return 1;
		}



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