import React from "react";
import Calendar from "../../Elements/Calendar";
import {Button} from "../../Elements/Button";
import {TextField} from "../../Elements/TextField";
import Modal from "../../Elements/Modal";

const CalendarShow: React.FC = () => {
  const [, setTest] = React.useState();
  const [text, setText] = React.useState("");
  
  return (
    <div style={{margin: 40}}>
      <Calendar onChange={setTest}/>
      <div>
        <Button>Sign in</Button>
        <Button buttonType="border">Sign in</Button>
        <Button buttonType="ghost">Sign in</Button>
      </div>
      <div>
        <Button colorType="secondary">Sign in</Button>
        <Button colorType="secondary" buttonType="border">
          Sign in
        </Button>
        <Button colorType="secondary" buttonType="ghost">
          Sign in
        </Button>
      </div>
      <div>
        <Button colorType="success">Sign in</Button>
        <Button colorType="success" buttonType="border">
          Sign in
        </Button>
        <Button colorType="success" buttonType="ghost">
          Sign in
        </Button>
      </div>
      <div>
        <Button colorType="error">Sign in</Button>
        <Button colorType="error" buttonType="border">
          Sign in
        </Button>
        <Button colorType="error" buttonType="ghost">
          Sign in
        </Button>
      </div>
      <div>
        <Button colorType="foreground">Sign in</Button>
        <Button colorType="foreground" buttonType="border">
          Sign in
        </Button>
        <Button colorType="foreground" buttonType="ghost">
          Sign in
        </Button>
      </div>
      <div>
        <Button sizeType="xs">Sign in</Button>
        <br/>
        <Button sizeType="sm">Sign in</Button>
        <br/>
        <Button sizeType="md">Sign in</Button>
        <br/>
        <Button sizeType="lg">Sign in</Button>
        <br/>
        <Button sizeType="xl">Sign in</Button>
        <br/>
      </div>
      <div>
        <TextField onChange={(e) => setText(e.target.value)} value={text}/>
      </div>
      <div>
        <Modal title="Hello world">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          alias velit harum et ipsa laboriosam quis quas voluptatum saepe quos
          rerum cumque dolore, iusto ratione expedita ut incidunt nesciunt
          vitae?
        </Modal>
      </div>
    </div>
  );
};

export default CalendarShow;
