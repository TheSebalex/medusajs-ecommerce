import {
  Table,
  StatusBadge,
  Input,
  Button,
  DropdownMenu,
  IconButton,
  usePrompt,
  toast,
  Toaster
} from "@medusajs/ui";
import { useEffect, useState, useMemo } from "react";
import { EllipsisHorizontal, PencilSquare, Trash } from "@medusajs/icons";
import { format } from "date-fns";
import axios from "axios";
import deleteArticle from "../../utils/delete-article";
import { useNavigate } from "react-router-dom";

const getPosts = async (url : string): Promise<any | undefined> => {
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  console.log(data);

  return data;
};

const BlogTable = ({ urlApi }: { urlApi: string; onlyActive?: boolean }) => {
  const [onlyActive, setOnlyActive] = useState(false);
  const [onlyInactive, setOnlyInactive] = useState(false);

  const [posts, setPosts] = useState({ results: [], pages: 0 });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const PAGE_SIZE = 15;

  const navigate = useNavigate()

  const deletePrompt = usePrompt();

  useEffect(() => {
    const filtered =
      (posts?.results ?? []).filter(
        (val) =>
          val.title.includes(searchValue) &&
          (onlyActive ? val.active : true) &&
          (onlyInactive ? !val.active : true)
      ) ?? [];

    setFilteredPosts(filtered);
  }, [searchValue, currentPage, posts, onlyActive, onlyInactive]);

  const deleteHandle = async (id) => {
    const confirmed = await deletePrompt({
      title: "Are you sure?",
      description: "This will delete this post forever.",
    });
    if (confirmed) {
      await deleteArticle(id);
      await getPosts(urlApi).then((data) => {
        setPosts(data);
      });
      toast.success("Post deleted successfully")
    }
  };

  const currentOrders = useMemo(() => {
    const offset = currentPage * PAGE_SIZE;
    const limit = Math.min(offset + PAGE_SIZE, filteredPosts.length ?? 0);

    return filteredPosts.slice(offset, limit);
  }, [filteredPosts, currentPage, searchValue]);

  useEffect(() => {
    getPosts(urlApi).then((data) => {
      setPosts(data);
    });
  }, []);

  const pageCount = Math.ceil((filteredPosts?.length ?? 1) / PAGE_SIZE);

  useEffect(() => {
    if (onlyInactive) {
      setOnlyActive(false);
    }
  }, [onlyInactive]);

  useEffect(() => {
    if (onlyActive) {
      setOnlyInactive(false);
    }
  }, [onlyActive]);

  return (
    <>
      <div className="grid">
        <div className="flex mb-4 w-full">
          <div className="mr-auto flex gap-2">
            <Button
              variant={onlyActive ? "primary" : "secondary"}
              onClick={() => setOnlyActive(!onlyActive)}
            >
              Only Active
            </Button>
            <Button
              variant={onlyInactive ? "primary" : "secondary"}
              onClick={() => setOnlyInactive(!onlyInactive)}
            >
              Only Inactive
            </Button>
          </div>
          <div className="w-auto ml-auto">
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              type="search"
              placeholder="Search..."
            />
          </div>
        </div>
        <Table>
          <Table.Header>
            <Table.Row className="[&_th]:h-[40px]">
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Handle</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
              <Table.HeaderCell>Pub. date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentOrders?.map((post, index) => (
              <Table.Row className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.handle}</Table.Cell>
                <Table.Cell>
                  <StatusBadge color={post.active ? "green" : "red"}>
                    {post.active ? "Active" : "Inactive"}
                  </StatusBadge>
                </Table.Cell>
                <Table.Cell>
                  {format(post.pub_date, "dd/MM/yyyy - hh:mm")}
                </Table.Cell>
                <Table.Cell>
                  <DropdownMenu>
                    <DropdownMenu.Trigger asChild>
                      <IconButton>
                        <EllipsisHorizontal />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item
                        onClick={() => {
                          navigate(`/a/blog/${post.id}`);
                        }}
                        className="gap-x-2"
                      >
                        <PencilSquare className="text-ui-fg-subtle" />
                        Edit
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item
                        onClick={() => deleteHandle(post.id)}
                        className="gap-x-2"
                      >
                        <Trash className="text-ui-fg-subtle" />
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Table.Pagination
          count={filteredPosts.length ?? 1}
          pageSize={PAGE_SIZE}
          pageIndex={currentPage}
          pageCount={pageCount}
          canPreviousPage={currentPage > 0}
          canNextPage={currentPage < pageCount - 1}
          previousPage={() => {
            setCurrentPage(currentPage - 1);
          }}
          nextPage={() => {
            setCurrentPage(currentPage + 1);
          }}
        />
      </div>
      <Toaster/>
    </>
  );
};

export default BlogTable;
