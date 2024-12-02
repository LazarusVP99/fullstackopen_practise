// Service class for handling database operations with Mongoose models
class ModelsService {
  constructor(Model) {
    this.Model = Model;
  }

  readAll = async (dataToPopulate) => this.Model.find({}).populate(dataToPopulate);

  create = async (data) => {
    const document = new this.Model(data);
    return document.save();
  };

  update = async (id, updateData) => this.Model.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  delete = async (id) => this.Model.findByIdAndDelete(id);
}

export default ModelsService;
