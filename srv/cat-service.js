import cds from "@sap/cds";
class CatalogService extends cds.ApplicationService {
  init() {
    const { Books, Orders } = this.entities;
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
