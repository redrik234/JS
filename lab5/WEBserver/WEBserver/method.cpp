#include "stdafx.h"

using namespace std;
using namespace experimental::filesystem;

string GetAllFilesJSON()
{
	path filesDir = "files";
	recursive_directory_iterator dir(filesDir);
	vector<string> paths;
	vector<bool> isDir;

	for (auto it : dir)
	{
		paths.push_back(it.path().generic_string());
		isDir.push_back(is_directory(it.path()));
	}

	stringstream json;
	json << '[';

	for (size_t i = 0; i < paths.size() - 1; ++i)
	{
		json << "{\"name\":\"" << paths[i] << "\", \"isDir\":\"" << isDir[i] << "\"}, ";
	}
	json << "{\"name\":\"" << paths.back() << "\", \"isDir\":\"" << isDir.back() << "\"}]";

	return json.str();
}

void Unescape(string & path)
{
	static const string space = "%20";
	int pos = path.find(space);
	while (pos != string::npos)
	{
		path.replace(pos, 3, " ");
		pos = path.find(space);
	}
}

string GetAllFiles()
{
	string response_body = GetAllFilesJSON();
	stringstream response;
	response << "HTTP/1.1 200 OK\r\n"
		<< "Version: HTTP/1.1\r\n"
		<< "Access-Control-Allow-Origin: *\r\n"
		<< "Access-Control-Allow-Methods: GET, DELETE\r\n"
		<< "Connection: close\r\n"
		<< "Content-Type: application/json; charset=utf-8\r\n"
		<< "Content-Length: " << response_body.length()
		<< "\r\n\r\n"
		<< response_body;
	return response.str();
}

bool GetFile(string & path, string & x)
{
	path.erase(0, 1);
	ifstream file(path, ios::binary);
	if (file.is_open())
	{
		stringstream stream;
		stream << file.rdbuf();
		x = stream.str();
		return true;
	}
	return false;
}

string ContentTypeHeader(string & filePath)
{
	path file = filePath;
	string extension = file.extension().generic_string();
	if (extension.compare(".txt") == 0)
		return "Content-Type: text/plain; charset=utf-8\r\n";
	if (extension.compare(".html") == 0)
		return "Content-Type: text/html; charset=utf-8\r\n";
	if (extension.compare(".css") == 0)
		return "Content-Type: text/css; charset=utf-8\r\n";
	if (extension.compare(".js") == 0)
		return "Content-Type: text/javascript; charset=utf-8\r\n";
	if (extension.compare(".gif") == 0)
		return "Content-Type: image/gif\r\n";
	if (extension.compare(".png") == 0)
		return "Content-Type: image/png\r\n";
	if (extension.compare(".jpg") == 0 || extension.compare(".jpeg") == 0)
		return "Content-Type: image/jpeg\r\n";
	if (extension.compare(".bmp") == 0)
		return "Content-Type: image/bmp\r\n";
	if (extension.compare(".mp3") == 0)
		return "Content-Type: audio/mpeg\r\n";
	if (extension.compare(".xml") == 0)
		return "Content-Type: application/xml\r\n";
	if (extension.compare(".pdf") == 0)
		return "Content-Type: application/pdf\r\n";
	return "Content-Type: application/octet-stream\r\n";
}

string GetFile(string & path)
{
	string response_body;
	bool fileFound = GetFile(path, response_body);
	stringstream response;
	if (fileFound)
	{
		response << "HTTP/1.1 200 OK\r\n"
			<< "Version: HTTP/1.1\r\n"
			<< "Access-Control-Allow-Origin: *\r\n"
			<< "Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS\r\n"
			<< "Connection: close\r\n"
			<< ContentTypeHeader(path)
			<< "Content-Length: " << response_body.length()
			<< "\r\n\r\n"
			<< response_body;
	}
	else
	{
		response_body = "404 File not found";
		response << "HTTP/1.1 404 File not found\r\n"
			<< "Version: HTTP/1.1\r\n"
			<< "Access-Control-Allow-Origin: *\r\n"
			<< "Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS\r\n"
			<< "Connection: close\r\n"
			<< "Content-Type: text/plain; charset=utf-8\r\n"
			<< "Content-Length: " << response_body.length()
			<< "\r\n\r\n"
			<< response_body;
	}
	return response.str();
}

string DeleteSelectedFile(string path)
{
	path.erase(0, 1);
	remove_all(path);

	string response_body = GetAllFilesJSON();
	stringstream response;
	response << "HTTP/1.1 200 OK\r\n"
		<< "Version: HTTP/1.1\r\n"
		<< "Access-Control-Allow-Origin: *\r\n"
		<< "Access-Control-Allow-Methods: GET, DELETE\r\n"
		<< "Connection: close\r\n"
		<< "Content-Type: application/json; charset=utf-8\r\n"
		<< "Content-Length: " << response_body.length()
		<< "\r\n\r\n"
		<< response_body;
	return response.str();
	
}