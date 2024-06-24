function EditSportField({ params }: { params: { slug: string } }) {
  return (
    <div className="item-center flex h-full w-full flex-col justify-center">
      <h1>Edit Sport Field</h1>
      <div>My Post: {params.slug}</div>
    </div>
  );
}

export default EditSportField;
