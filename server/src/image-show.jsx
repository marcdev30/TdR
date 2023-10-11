const RandomPicture = (props) => {
  // Picsum generates a random 200x200 photo
  let returnable;
  const params = props.record.params;
  if (params.image) {
    const path = `/imatges/${props.resource.id}/${params.id}/${params.imatge}`;

    returnable = (
      <img
        style={{ height: "100px", width: "100px", objectFit: "contain" }}
        src={path}
      />
    );
  } else {
    returnable = <></>;
  }

  return returnable;
};

export default RandomPicture;
