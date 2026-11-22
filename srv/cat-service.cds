using {bookshop} from '../db/schema';

service CatalogService {

    entity Books as 
        select from bookshop.Books {
            *,
               stock < 50 ? title : title || ' - 10% discount' as displayTitle : String
    }



    entity Authors as projection on bookshop.Authors;
    entity Orders as projection on bookshop.Orders;

}