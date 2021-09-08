#include <iostream>
#include <ctime>
#include <stdio.h>      /* NULL */
#include <stdlib.h>     /* srand, rand */
#include <time.h>       /* time */
using namespace std;

void delay_us(std::clock_t us_interval) {
  std::clock_t end_time = clock() + (us_interval * CLOCKS_PER_SEC) / 1000000;
  while( clock() < end_time ) ;
};

void outputdata()
{
    cout << "[" << rand()%(32768 + 1) << ", " << rand()%(9 + 1) << ", " << rand()%(3 + 1) << ", " << static_cast <float> (rand()) / static_cast <float> (RAND_MAX) << "]" << endl;
}

int main() {
    srand (time(NULL));
    while (1) {
        outputdata();
        delay_us((1/5)*1000*1000);
    }

    return 0;
}