import Card from "./Card";

const Canceled = () => {
  return (
    <div className="container-fluid pt-3">
      <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
        <div className="col">
          <Card
            title="new task"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat itaque doloribus beatae, soluta veritatis exercitationem nobis autem doloremque esse eligendi non consectetur"
            date="22/10/23"
            status="Canceled"
          />
        </div>
      </div>
    </div>
  );
};

export default Canceled;
