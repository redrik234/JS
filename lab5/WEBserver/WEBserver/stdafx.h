// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently, but
// are changed infrequently
//

#pragma once

#include "targetver.h"

#include <stdio.h>
#include <tchar.h>

#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif

#include "winsock2.h"
#include "ws2tcpip.h"
#include "iphlpapi.h"
#include <sstream>
#include <iostream>

#include <filesystem>
#include <fstream>
#include <string>
#include <vector>
#include "Windows.h"

#pragma comment(lib, "Ws2_32.lib")

// TODO: reference additional headers your program requires here
