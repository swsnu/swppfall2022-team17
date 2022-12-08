import userEvent from "@testing-library/user-event";
import ArticlePreview from "components/contents/ArticlePreview";
import { ManagedCafe } from "components/contents/CafesMap";
import { articles, cafes } from "mocks/stubs";
import { act, render, screen } from "tests/utils";

const renderArticlePreview = () =>
  render(
    <ArticlePreview
      cafeName="cafe1"
      cafeAvatar={(cafes[0] as ManagedCafe).avatar}
      article={articles[0]}
      editable
    />
  );

describe("article preview", () => {
  it("handles edit", async () => {
    await act(() => {
      renderArticlePreview();
    });

    const editButton = screen.getByRole("button", { name: /수정/ });
    await userEvent.click(editButton);

    const titleInput = screen.getByRole("textbox", { name: /title/ });
    await userEvent.type(titleInput, "new title");

    const contentInput = screen.getByRole("textbox", { name: /content/ });
    await userEvent.type(contentInput, "new content");

    const confirmButton = screen.getByRole("button", { name: /확인/ });
    await userEvent.click(confirmButton);
  });

  it("handles edit cancel", async () => {
    await act(() => {
      renderArticlePreview();
    });

    const editButton = screen.getByRole("button", { name: /수정/ });
    await userEvent.click(editButton);

    const cancelButton = screen.getByRole("button", { name: /취소/ });
    await userEvent.click(cancelButton);
  });

  it("handles delete", async () => {
    await act(() => {
      renderArticlePreview();
    });

    const deleteButton = screen.getByRole("button", { name: /삭제/ });
    await userEvent.click(deleteButton);
  });

  it("shows commnets list", async () => {
    await act(() => {
      renderArticlePreview();
    });

    const openButton = screen.getByRole("button", { name: /댓글 보기/ });
    await userEvent.click(openButton);
    const commentContent = screen.getByText(articles[0].comments[0].content);
    expect(commentContent).toBeInTheDocument;

    const closeButton = screen.getByRole("button", { name: /댓글 닫기/ });
    await userEvent.click(closeButton);
    expect(commentContent).not.toBeInTheDocument();
  });
});
