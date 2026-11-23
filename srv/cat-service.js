import cds from "@sap/cds";
class CatalogService extends cds.ApplicationService {
  init() {
    const { Books, Orders } = this.entities;
    this.before("CREATE", Orders, async (req) => {
      let { amount, book_ID } = req.data;
      const { price, stock } = await SELECT.one.from(Books, book_ID);
      let totalPrice = price * amount;
      if (stock >= 50) totalPrice = totalPrice * 0.9;
      req.data.totalPrice = Math.round(totalPrice * 100) / 100;
    });
    this.after("CREATE", Orders, async (_, req) => {
      let { ID, amount, book_ID } = req.data;
      let result = await UPDATE(Books, book_ID).with({
        stock: { "-=": amount },
      });
    });
    return super.init();
  }
}
export default CatalogService;
