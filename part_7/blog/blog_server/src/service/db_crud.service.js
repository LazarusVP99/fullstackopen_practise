// Service class for handling database operations with Mongoose models
class ModelsService {
  constructor(Model) {
    this.Model = Model;
  }

  readAll = async (dataToPopulate) => this.Model.find({}).populate(dataToPopulate);

  readOne = async (id, populate = null) => {
    const document = await this.Model.findById(id);
    return populate
      ? this.Model.findById(document._id).populate(populate)
      : document;
  };

  create = async (data, populate = null) => {
    const document = new this.Model(data);
    const savedDocument = await document.save();

    return populate ? this.Model
      .findById(savedDocument._id).populate(populate) : savedDocument;
  };

  update = async (id, updateData) => this.Model.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  delete = async (id) => this.Model.findByIdAndDelete(id);
}

export default ModelsService;
