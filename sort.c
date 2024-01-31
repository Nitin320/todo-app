#include <stdio.h>

int i = 300, n = 150, counter = 0;

void main(){
  while (i >= n){
    i = i-2;
    n = n+1; 
	counter++;
  }
  printf("%d", counter);
}