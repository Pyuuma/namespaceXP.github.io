#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <errno.h>
#include <ctype.h>
#include <string.h>
#include <memory.h>
#include <stdio.h>
#include <unistd.h> 
#include <termios.h> 
#include <sys/types.h>    
#include <netinet/in.h>   
#include <sys/time.h>   
#include <sys/ioctl.h>     
#include <ifaddrs.h>
#include <netinet/in.h> 
#include <arpa/inet.h>
#include <unistd.h>
#include <sys/types.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include <signal.h>
#include <sys/stat.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>

#define DEFAULT_PORT 21
#define BUFFER_SIZE 8192

int server_len, client_len;  
int request_port = DEFAULT_PORT;
int client_port = 0;
int PASV_port = 0;
char myIp[20] = "127.0.0.1";
int port_transfer = 0;
int server_sock, client_sock, PASV_sock, PASV_sock2;
char sentence[8192], empty[8192] = {""}, buffer[8192];
struct sockaddr_in addr;
int user_mode = 1;   // 1:等待输入用户名  2：等待输入密码  3:登入成功，无请求  4.处于PORT模式   5.处于PASV模式 
int PORT_sockfd = 0;
char PORT_ip[20];
int sockfd;
int result;
char filename[100];
char dir[100] = "tmp/";

int create_server_socket(int port);
int create_PASV_socket(int port);
int connect_to_client(char* ip, int port);
int read_requirement(int client_sock);
int handle_requirement(int sock);
int send_message(int sock, char * message);
void mainloop(int sock);

int getMyIP();
int isSTOR();
int isRETR();
int isPORT();
int handlePASV();
int handleSTOR();
int handleRETR();
int isPassword();

int getMyIP()   //读取自身IP
{
    struct ifaddrs * ifAddrStruct = NULL;
    void * tmpAddrPtr = NULL;
    getifaddrs(&ifAddrStruct);
	
    while (ifAddrStruct != NULL) 
	{
        if (ifAddrStruct->ifa_addr->sa_family == AF_INET)
		{   // check it is IP4
            // is a valid IP4 Address
            tmpAddrPtr = &((struct sockaddr_in *)ifAddrStruct->ifa_addr)->sin_addr;
            char addressBuffer[INET_ADDRSTRLEN];
            inet_ntop(AF_INET, tmpAddrPtr, addressBuffer, INET_ADDRSTRLEN);
			if(strcmp(ifAddrStruct->ifa_name,"en4") == 0)
            	strcpy(myIp, addressBuffer);
        }
        ifAddrStruct = ifAddrStruct->ifa_next;
    }
	return 0;
}

int create_server_socket(int port)
{
	if ((server_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == -1)
	{
		printf("Error socket(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(port);
	addr.sin_addr.s_addr = htons(INADDR_ANY);

	if (bind(server_sock, (struct sockaddr*)&addr, sizeof(addr)) == -1)
	{
		printf("Error bind(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}

	if (listen(server_sock, 10) == -1)
	{
		printf("Error listen(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}
	return 0;
}

int create_PASV_socket(int port)
{
	if ((PASV_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == -1)
	{
		printf("Error socket(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(port);
	addr.sin_addr.s_addr = htons(INADDR_ANY);

	if (bind(PASV_sock, (struct sockaddr*)&addr, sizeof(addr)) == -1)
	{
		printf("Error bind(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}

	if (listen(PASV_sock, 10) == -1)
	{
		printf("Error listen(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}
	return 0;
}

int connect_to_client(char* ip, int port){
	if ((PORT_sockfd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == -1) 
	{
		printf("Error socket(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(port);
	if (inet_pton(AF_INET, ip, &addr.sin_addr) <= 0) 
	{
		printf("Error inet_pton(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}

	if (connect(PORT_sockfd, (struct sockaddr*)&addr, sizeof(addr)) < 0) 
	{
		printf("Error connect(): %s(%d)\n", strerror(errno), errno);
		return 1;
	}
	return 0;                                                     
}

int read_requirement(int client_sock){
	for(int i = 0; i < BUFFER_SIZE; i++)
	{
		sentence[i] = '\0';
	}
	int p = 0;
	int len;
	printf("reading\n");
	int n = recv(client_sock, sentence, 8191, 0);
	printf("readed\n");
	return 0;
}

int handle_requirement(int sock)
{	
	int p;
	int len = strlen(sentence);
	sentence[len - 2] = '\0';
	printf("recv:|%s\n", sentence);
	if(user_mode == 1)
	{
		if(strcmp(sentence, "USER anonymous") == 0)
		{
			strcpy(sentence, "331 Guest login ok, send your complete e-mail address as password.\r\n"); /*给数组赋字符串*/
			send_message(sock, sentence); 
			user_mode = 2;
		}
		else
		{
			strcpy(sentence, "Invalid input, please input the correct USER.\r\n"); /*给数组赋字符串*/ 
			send_message(sock, sentence);
		}
	}
	
	else if(user_mode == 2)
	{
		if(isPassword())
		{
			strcpy(sentence, "230-Welcome to\r\n230-XP's FTP\r\n230 Guest login ok, access restrictions apply.\r\n"); /*给数组赋字符串*/ 
			send_message(sock, sentence);
			user_mode = 3;
		}
		else
		{
			strcpy(sentence, "Invalid input, please input.\r\n"); /*给数组赋字符串*/
			send_message(sock, sentence); 
		}
	}
	else if(user_mode >= 3)
	{
		if(strcmp(sentence, "QUIT") == 0)
		{
			strcpy(sentence, "221-Thank you for using XP's FTP.\r\n221 Goodbye.\r\n"); /*给数组赋字符串*/ 
			send_message(sock, sentence);
			return 1;
		}
		else if(strcmp(sentence, "PASV") == 0)
		{
			handlePASV();
			send_message(sock, sentence); 
		}
		else if(isPORT())
		{	
			user_mode = 4;
			strcpy(sentence, "200 PORT command successful.\r\n"); /*给数组赋字符串*/
			send_message(sock, sentence); 
		}
		else if (isSTOR())
		{
			strcpy(sentence, "150 Opening BINARY mode data connection for \r\n");
			send_message(sock, sentence); 
			handleSTOR();
		}	
		else if (isRETR())
		{
			strcpy(sentence, "150 Opening BINARY mode data connection for \r\n"); 
			send_message(sock, sentence);
			handleRETR();
		}
		else if(strcmp(sentence, "SYST") == 0)
		{
			strcpy(sentence, "215 UNIX Type: L8\r\n"); /*给数组赋字符串*/ 
			send_message(sock, sentence);
		}
		else if(strcmp(sentence, "TYPE I") == 0)
		{
			strcpy(sentence, "200 Type set to I.\r\n"); /*给数组赋字符串*/ 
			send_message(sock, sentence);
		}
		else
		{
			strcpy(sentence, "Invalid input, please input.\r\n"); /*给数组赋字符串*/
			send_message(sock, sentence); 
		}
	}
	return 0;
}

int isPassword()
{
	if(sentence[0] == 'P' && sentence[1] == 'A' &&sentence[2] == 'S' &&sentence[3] == 'S' && sentence[4] == ' ')
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

int isPORT()
{
	if(sentence[0] == 'P' && sentence[1] == 'O' &&sentence[2] == 'R' &&sentence[3] == 'T')
	{
		int i = 0, j = 0, len;
		int read_temp[6] = {0};
	
		len = strlen(sentence);
		for(i = 4; i < len; i++)
		{
			if(sentence[i] >= '0' && sentence[i] <= '9')
			{
				read_temp[j] = read_temp[j] * 10 + sentence[i] - '0';
			}
			else if(sentence[i] == ',')
			{
				j++;
			}
			else if(sentence[i] == ' ')
			{
				;
			}
			else
			{
				return 0;
			}
		}
		client_port = read_temp[4] * 256 + read_temp[5];
		sprintf(PORT_ip, "%d.%d.%d.%d", read_temp[0], read_temp[1], read_temp[2], read_temp[3]);
		return 1;
	}
	else
	{
		return 0;
	}
}

int isRETR()
{
	if(sentence[0] == 'R' && sentence[1] == 'E' &&sentence[2] == 'T' &&sentence[3] == 'R')
	{
		int i = 0, j = 0, len;
		int read_temp[6] = {0};
	
		len = strlen(sentence);
		for(i = 5; i < len; i++)
		{
			filename[i - 5] = sentence[i];
		}
		filename[i - 5] = '\0';
		printf("|%s|\n", filename);
		return 1;
	}
	else
	{
		return 0;
	}
}

int handlePASV()
{
	user_mode = 5;
	int sendIp[4] = {0}, port1, port2, len = strlen(myIp);
	int i, j = 0;
	srand((unsigned) time(NULL)); 
	
	while(1)  //寻找可用的随机端口
	{
		PASV_port = (rand() % 45535) + 20000;
		port1 = PASV_port / 256;
		port2 = PASV_port % 256;
		if(create_PASV_socket(PASV_port) == 0)
			break;
	}
	
	for(i = 0; i < len; i++)
	{
		if(myIp[i] <= '9' && myIp[i] >= '0')
		{
			sendIp[j] = sendIp[j] * 10 + (int)(myIp[i] - '0');
		}
		else if(myIp[i] == '.')
		{
			j++;
		}
		else
		{
			printf("IP resolve error!");
		}
	}
	sprintf(sentence,  "227 Entering Passive Mode (%d,%d,%d,%d,%d,%d)\r\n", sendIp[0], sendIp[1], sendIp[2], sendIp[3], port1, port2);
	return 0;
}

int handleRETR()
{
	char filelocation[100];
	printf("|%s|", dir);
	strcpy(filelocation, dir);
	printf("|%s|\n", filelocation);
	strcat(filelocation, filename);
	printf("|%s|\n", filelocation);
	if(user_mode == 4)
	{
		printf("Connecting to %s, port:%d\n", PORT_ip, client_port);
		connect_to_client(PORT_ip, client_port);
		FILE *fp = fopen(filelocation, "r");
		if(fp == NULL)
		{
			printf("File:\t%s Not Found!", filename);
			return -1;
		}
		else
		{
			bzero(buffer, BUFFER_SIZE);
			int file_block_length = 0;
			while((file_block_length = fread(buffer, sizeof(char), BUFFER_SIZE, fp)) > 0)
			{
				printf("file_block_length = %d\n", file_block_length);  
				if (send(PORT_sockfd, buffer, file_block_length, 0) < 0)  
				{  
					printf("Send File:\t%s Failed!\n", filename);  
					return -1;
				}  
				bzero(buffer, sizeof(buffer));  
			}
			fclose(fp);
			printf("File:\t%s Transfer Finished!\n", filename); 
		}
		user_mode = 3;
		send_message(client_sock, "226 Transfer Finished!\r\n"); 
		close(PORT_sockfd); 
	}
	else if(user_mode == 5)
	{
		if((PASV_sock2 = accept(PASV_sock, NULL, NULL)) == -1)
		{
			printf("Error accept(): %s(%d)\n", strerror(errno), errno);
		}
		else
		{
			FILE *fp = fopen(filelocation, "r");
			if(fp == NULL)
			{
				printf("File:\t%s Not Found!", filename);
				return -1;
			}
			else
			{
				bzero(buffer, BUFFER_SIZE);
				int file_block_length = 0;
				while((file_block_length = fread(buffer, sizeof(char), BUFFER_SIZE, fp)) > 0)
				{
					printf("file_block_length = %d\n", file_block_length);  
					if (send(PASV_sock2, buffer, file_block_length, 0) < 0)  
					{  
						printf("Send File:\t%s Failed!\n", filename);  
						return -1;
					}  
					bzero(buffer, sizeof(buffer));  
				}
				fclose(fp);
				printf("File:\t%s Transfer Finished!\n", filename); 
			}
			user_mode = 3;
			send_message(client_sock, "226 Transfer Finished!\r\n"); 
			close(PASV_sock2);
		}
	}
	return 0;
}

int isSTOR()
{
	if(sentence[0] == 'S' && sentence[1] == 'T' &&sentence[2] == 'O' &&sentence[3] == 'R')
	{
		int i = 0, j = 0, len;
		int read_temp[6] = {0};
	
		len = strlen(sentence);
		for(i = 5; i < len; i++)
		{
			filename[i - 5] = sentence[i];
		}
		printf("|%s|\n", filename);
		return 1;
	}
	else
	{
		return 0;
	}
}

int handleSTOR()
{
	char filelocation[100];
	strcpy(filelocation, dir);
	strcat(filelocation, filename);
	if(user_mode == 4)
	{
		printf("Connecting to %s, port:%d\n", PORT_ip, client_port);
		connect_to_client(PORT_ip, client_port);
		FILE *fp = fopen(filelocation, "w");  
	    if (fp == NULL)  
		{  
			printf("File:\t%s Can Not Open To Write!\n", filename);  
	        return -1; 
	   	}
	    bzero(buffer, sizeof(buffer));  
	   	int length = 0; 
	    while((length = recv(PORT_sockfd, buffer, BUFFER_SIZE, 0)) > 0)  
	   	{ 
			int write_length = fwrite(buffer, sizeof(char), length, fp);
	       	if (write_length < length)  
	        {  
	           printf("File:\t%s Write Failed!\n", filename);  
	           return -1; 
	        }  
	        bzero(buffer, BUFFER_SIZE);  
	    }  
	    printf("Recieve File:\t %s Finished!\n", filename);    
		fclose(fp); 
		send_message(client_sock, "226 Transfer Finished!\r\n"); 
		user_mode = 3;
		close(PORT_sockfd); 
	}
	
	else if(user_mode == 5)
	{
		if((PASV_sock2 = accept(PASV_sock, NULL, NULL)) == -1)
		{
			printf("Error accept(): %s(%d)\n", strerror(errno), errno);
		}
		FILE *fp = fopen(filelocation, "w");  
	    if (fp == NULL)  
		{  
			printf("File:\t%s Can Not Open To Write!\n", filename);  
	        return -1;
	   	}
	    bzero(buffer, sizeof(buffer));  
	   	int length = 0; 
	    while((length = recv(PASV_sock2, buffer, BUFFER_SIZE, 0)) > 0)  
	   	{ 
			int write_length = fwrite(buffer, sizeof(char), length, fp);	
	       	if (write_length < length)  
	        {  
	           printf("File:\t%s Write Failed!\n", filename);  
	           break;  
	        }  
	        bzero(buffer, BUFFER_SIZE);  
	    }  
	    printf("Recieve File:\t %s Finished!\n", filename);    
		fclose(fp); 
		send_message(client_sock, "226 Transfer Finished!\r\n"); 
		user_mode = 3;
		close(PASV_sock2); 
	}
	return 0;
}


int send_message(int sock, char * message){
	int p = 0;
	int len = strlen(message);
	int n = send(sock, message, len, 0);
	return 0;
}

void main_loop(int sock)
{
	while(1)
	{
		read_requirement(sock);
		if(handle_requirement(sock) == 1)
			break;
	}
	return;
}
int main(int argc, char **argv)
{
	int i;
	int length;
	pid_t pid;
	if(argc >= 3)
	{
		if(strcmp(argv[1], "-port") == 0)
		{
			request_port = atoi(argv[2]);
		}
		if(argc >= 5)
		{
			printf("|%s|", argv[4]);
			if(strcmp(argv[3], "-root") == 0)
			{
				length = strlen(argv[4]);
				strcpy(dir, argv[4]);
				strcat(dir, "/");
			}
		}
	}
	printf("XP's Server Started!\n");
	getMyIP();
	printf("IP: %s\n", myIp);
	printf("Port: %d\n", request_port);
	printf("Directory: %s\n", dir);
	create_server_socket(request_port);

	while(1)
	{
		if((client_sock = accept(server_sock, NULL, NULL)) == -1)
		{
			printf("Error accept(): %s(%d)\n", strerror(errno), errno);
		}
		
		else
		{
			pid = fork();
			if(pid == 0)
			{
				close(client_sock);
			}
			else
			{
				close(server_sock);
				send_message(client_sock, "220 XP's server ready.\r\n");
				main_loop(client_sock);
				close(client_sock);
				return 0;
			}
		}
	}
	close(server_sock);
	return 0;
}

