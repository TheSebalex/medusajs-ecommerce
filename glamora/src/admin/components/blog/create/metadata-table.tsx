import { Button, Table, Toaster, toast } from "@medusajs/ui";
import { Trash, Plus, Check } from "@medusajs/icons";
import { useRef } from "react";

const MetadataTable = ({
  metadataState,
  images,
}: {
  metadataState: any;
  images: any[];
}) => {
  const currentEdittingData = useRef({});
  const [metadata, setMetadata] = metadataState;

  return (
    <>
      <Table>
        <Table.Header>
          <Table.HeaderCell>Key</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>
            <div className="w-full h-full flex justify-end gap-2 p-5">
              <Button
                onClick={() =>
                  setMetadata([
                    ...metadata,
                    { key: "", content: "", editting: false },
                  ])
                }
                variant="primary"
              >
                <Plus />
              </Button>
            </div>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {metadata.map((meta, i) => {
            const editMetadata = () => {
              const oldMetada = [...metadata];
              oldMetada[i].editting = true;
              setMetadata(oldMetada);
              currentEdittingData.current[i] = {};
            };

            const editDone = () => {
              const newMetadata = [...metadata];
              newMetadata[i].editting = false;
              newMetadata[i] = {
                ...newMetadata[i],
                ...currentEdittingData.current[i],
              };
              delete currentEdittingData.current[i];
              setMetadata(newMetadata);

              toast.success("Informacion", {
                description: "Metadata updated successfully",
              });
            };

            const changeValueMetadata = (
              e: React.FormEvent<HTMLInputElement>,
              prop: string
            ) => {
              currentEdittingData.current[i][prop] = e.currentTarget.value;
            };

            return (
              <Table.Row>
                <Table.Cell>
                  {meta.editting ? (
                    <input
                      defaultValue={meta.key}
                      onChange={(e) => changeValueMetadata(e, "key")}
                      placeholder="Insert your key metadata here"
                      className="w-full h-full border-none bg-transparent outline-none px-4"
                    />
                  ) : (
                    <p onClick={editMetadata}>{meta.key ? meta.key : "-"}</p>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {meta.editting ? (
                    <input
                      defaultValue={meta.content}
                      onChange={(e) => changeValueMetadata(e, "content")}
                      placeholder="Insert your value metadata here"
                      className="w-full h-full border-none bg-transparent outline-none px-4"
                    />
                  ) : (
                    <p onClick={editMetadata}>
                      {meta.content ? meta.content : "-"}
                    </p>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <div className="w-full h-full flex justify-end gap-2 p-5">
                    {meta.editting ? (
                      <Button variant="secondary" onClick={editDone}>
                        <Check />
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          setMetadata(
                            metadata.filter(
                              (_: any, index: number) => index !== i
                            )
                          )
                        }
                      >
                        <Trash color="red" />
                      </Button>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Toaster />
    </>
  );
};

export default MetadataTable;
