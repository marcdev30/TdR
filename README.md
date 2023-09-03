const story = await Categoria.findOne({}).populate("productes").exec();
