#include <stdio.h>
#include <stdlib.h>

struct node{
    int data;
    int *left;
    int *right;
};

struct node *creation(){
    int x;
    struct node *newnode = (struct node*)malloc(sizeof(struct node));
    printf("Enter in the data : ");
    scanf("%d", &x);

    if(x == -1)return 0;
    else{
        newnode -> data = x;
        printf("Enter the left child of %d", x);
        newnode ->  left = creation();
        printf("Enter the right child of %d", x);
        newnode ->  right = creation();
        return newnode;
    }
}

void inorder(struct node *root){
    if(root != NULL){
        inorder(root -> left);
        printf("%d-", root -> data);
        inorder(root -> right);
    }
}

int main(){
    struct node *root = creation();
    inorder(root);
}