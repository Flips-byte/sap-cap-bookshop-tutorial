namespace bookshop;

entity Books {
key ID     : Integer;
    title  : String;
    author : Association to Authors;
    price  : Decimal(4,2);
    stock  : Integer;
}

entity Authors {
key ID    : Integer;
    name  : String;
    books : Association to many Books
                on books.author = $self;
}

entity Orders {
key ID          : Integer;
    book        : Association to Books;
    amount      : Integer;
    totalPrice  : Decimal(9,2);
}