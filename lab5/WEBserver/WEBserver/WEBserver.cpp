#include "stdafx.h"
#include "method.h"

const PCSTR DEFAULT_PORT = "80";
const size_t DEFAULT_BUFLEN = 512;


int main()
{
	setlocale(LC_ALL, "rus");

	WSADATA wsaData;

	int iResult;

	iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);

	if (iResult != 0)
	{
		std::cout << "WSAStartup failed: " << iResult << std::endl;
		return 1;
	}

	struct addrinfo *result = NULL;
	struct addrinfo *ptr = NULL;
	struct addrinfo hints;

	ZeroMemory(&hints, sizeof(hints));
	hints.ai_family = AF_UNSPEC;
	hints.ai_socktype = SOCK_STREAM;
	hints.ai_protocol = IPPROTO_TCP;

	iResult = getaddrinfo(NULL, DEFAULT_PORT, &hints, &result);

	if (iResult != 0)
	{
		std::cout << "Error getaddrinfo: " << iResult << std::endl;
		WSACleanup();
		return 1;
	}

	SOCKET listenSocket = INVALID_SOCKET;

	listenSocket = socket(result->ai_family, result->ai_socktype, result->ai_protocol);

	if (listenSocket == INVALID_SOCKET)
	{
		std::cout << "Error at socket: " << WSAGetLastError() << std::endl;
		freeaddrinfo(result);
		WSACleanup();
		return 1;
	}

	iResult = bind(listenSocket, result->ai_addr, result->ai_addrlen);

	if (iResult == SOCKET_ERROR)
	{
		std::cout << "Bind listen socket failed with error: " << WSAGetLastError() << std::endl;
		freeaddrinfo(result);
		closesocket(listenSocket);
		WSACleanup();
		return 1;
	}

	if (listen(listenSocket, SOMAXCONN) == SOCKET_ERROR)
	{
		std::cout << "Listen failed with error: " << WSAGetLastError();
		closesocket(listenSocket);
		WSACleanup();
		return 1;
	}

	

	char recvbuf[DEFAULT_BUFLEN];
	int iSendResult;
	int recvbuflen = DEFAULT_BUFLEN;

	do
	{
		SOCKET ClientSocket;

		ClientSocket = INVALID_SOCKET;
		ClientSocket = accept(listenSocket, NULL, NULL);

		if (ClientSocket == INVALID_SOCKET)
		{
			std::cout << "Accept failed with error: " << WSAGetLastError();
			closesocket(listenSocket);
			WSACleanup();
			return 1;
		}

		iResult = recv(ClientSocket, recvbuf, recvbuflen, 0);

		if (iResult > 0)
		{
			recvbuf[iResult] = '\0';
			std::stringstream received(recvbuf);
			std::string method;
			std::string path;
			std::string response;
			received >> method >> path;
			Unescape(path);
			std::cout << "Принято " << iResult << " байт" << std::endl;

			if (method.compare("GET") == 0 && path.compare("/") == 0)
			{
				response = GetAllFiles();
				iSendResult = send(ClientSocket, response.c_str(), response.length(), 0);
			}

			if (method.compare("GET") == 0)
			{
				response = GetFile(path);
				iSendResult = send(ClientSocket, response.c_str(), response.length(), 0);
			}
			else
			{
				response = DeleteSelectedFile(path);
				iSendResult = send(ClientSocket, response.c_str(), response.length(), 0);
			}

			if (iSendResult == SOCKET_ERROR)
			{
				std::cout << "Send failed with error: " << WSAGetLastError();
				closesocket(ClientSocket);
				WSACleanup();
				return 1;
			}

			std::cout << "Отправлено " << iSendResult << " байт" << std::endl;
		}
		else if (iResult == 0)
		{
			std::cout << "Соединение закрыто..." << std::endl;
		}
		else
		{
			std::cout << "Ошибка recv " << WSAGetLastError() << std::endl;
			closesocket(ClientSocket);
			WSACleanup();
			return 1;
		}
	} while (iResult > 0);
	
	WSACleanup();

    return 0;
}

