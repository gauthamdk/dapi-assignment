import Head from "next/head";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

export default function Home() {
  const token =
    "BQDvlY4VH0mi1PTIj00_CeDLmm-rDlwEBQxtdR_pZJpcpcISlXj3SD4eVCj5LiOTp2_Pf7MMwFN2BbjTeFJ0MpSjhRnjnfNluKaacdSkSl6GR7i67E9-5_9STSMb6RSSww52RMUiv332OdbLs4-2p85tVHw6Nn5YORZwPhs";
  const [songs, setSongs] = useState([]);

  const getSongs = async () => {
    const res = await fetch("https://api.spotify.com/v1/browse/new-releases", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setSongs(data.albums.items);
    console.log(songs);
  };

  return (
    <div>
      <Head>
        <title>Gautham Dapi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1 className="mt-3">Gautham - Dapi</h1>
        <Button onClick={getSongs} className="mt-3 mb-3">
          Get new releases
        </Button>
        <Row>
          {songs.map((song) => {
            return (
              <Col key={song.id} xl="3" lg="4" md="6">
                <a
                  href={song.external_urls.spotify}
                  className="text-decoration-none"
                >
                  <Card className="mb-3 shadow-sm">
                    <Card.Img variant="top" src={song.images[0].url} />
                    <Card.Body>
                      <Card.Title>{song.name}</Card.Title>
                      <Card.Text>{song.artists[0].name}</Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
