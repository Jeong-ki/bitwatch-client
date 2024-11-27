import { Button } from '@/components/common/button';

export default function Comp() {
  return (
    <div style={{ margin: '10px' }}>
      <Button color="primary" size="medium">
        Button
      </Button>
      <Button color="primary" size="medium" disabled>
        Button
      </Button>
      <Button color="primary" size="small">
        Button
      </Button>
      <Button color="primary" size="large">
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" size="medium">
        Button
      </Button>
      <Button color="secondary" size="medium" disabled>
        Button
      </Button>
      <Button color="secondary" size="small">
        Button
      </Button>
      <Button color="secondary" size="large">
        Button
      </Button>
      <br />
      <br />
      <Button color="danger" size="medium">
        Button
      </Button>
      <Button color="danger" size="medium" disabled>
        Button
      </Button>
      <Button color="danger" size="small">
        Button
      </Button>
      <Button color="danger" size="large">
        Button
      </Button>
      <br />
      <br />
      <Button color="invisible" size="medium">
        Button
      </Button>
      <Button color="invisible" size="medium" disabled>
        Button
      </Button>
      <Button color="invisible" size="small">
        Button
      </Button>
      <Button color="invisible" size="large">
        Button
      </Button>
    </div>
  );
}
