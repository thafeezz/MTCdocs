from typing import List
from langchain_text_splitters import MarkdownHeaderTextSplitter, MarkdownTextSplitter
from langchain_openai import OpenAIEmbeddings
from github import Github
from github import ContentFile

# globals bc lightweight script
# gh = Github()

# repo = gh.get_repo("thafeezz/MTCdocs")

# docs = repo.get_contents("frontend/content/docs") # warn: return type is either list or single file





# embeddings = OpenAIEmbeddings(model="text-embedding-3-large") 

# def load_docs(docs: list[str]): # list of paths to docs
    # load each doc from github
    # split document, use langchain.MarkdownHeaderTextSplitter
    # asyncgatherio to write embeddings to pinecone

# async def do_batch(docs: List[str]):
import argparse

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--added', type=str, nargs='*', default=[])
    parser.add_argument('--modified', type=str, nargs='*', default=[])
    parser.add_argument('--deleted', type=str, nargs='*', default=[])
    args = parser.parse_args()

    # Process files that were added or modified
    for file_path in args.added + args.modified:
        print(f"Processing {file_path}")
        with open(file_path, 'r') as f:
            content = f.read()
            print(content)
            # Generate and store embeddings...

    # Handle deleted files
    # for file_path in args.deleted:
    #     print(f"Removing {file_path}")
        # Remove embeddings for this file...

if __name__ == "__main__":
    main()