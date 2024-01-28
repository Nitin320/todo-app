
#include <stdio.h>
#include <stdlib.h>

void heapSort(int arr[], int n) {
	buildHeap(arr, n);
	for (int i = n - 1; i > 0; i--) {
		swap(&arr[0], &arr[i]);
		heapify(arr, i, 0);
	}
}

void buildHeap(int arr[], int n) {
	for (int i = n / 2 - 1; i >= 0; i--) {
		heapify(arr, n, i);
	}
}

void heapify(int arr[], int n, int i) {
	int largest = i;
	int left = 2 * i + 1;
	int right = 2 * i + 2;
	if (left < n && arr[left] > arr[largest]) {
		largest = left;
	}
	if (right < n && arr[right] > arr[largest]) {
		largest = right;
	}
	if (largest != i) {
		swap(&arr[i], &arr[largest]);
		heapify(arr, n, largest);
	}
}

void swap(int *a, int *b) {
	int temp = *a;
	*a = *b;
	*b = temp;
}

void displayArray(int arr[], int n) {
	for (int i = 0; i < n; i++) {
		printf("%d ", arr[i]);
	}
	printf("\n");
}

int main() {
	int n;
	printf("Enter the size of the array: ");
	scanf("%d", &n);
	int *arr = (int *)malloc(n * sizeof(int));
	printf("Enter %d elements:\n", n);
	for (int i = 0; i < n; i++) {
		scanf("%d", &arr[i]);
	}
	heapSort(arr, n);
	printf("Array after Heap Sort: ");
	displayArray(arr, n);
	free(arr);
	return 0;
}
