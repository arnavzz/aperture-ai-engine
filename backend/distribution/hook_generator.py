def generate_tldr(summary: str) -> str:
    return f"<div class='tldr'><strong>TL;DR:</strong> {summary}</div>"

def generate_jump_links(sections: list[str]) -> str:
    items = "".join(f"<li><a href='#{sec}'>{sec}</a></li>" for sec in sections)
    return f"<nav class='toc'><ul>{items}</ul></nav>"

def wrap_with_hooks(html: str, summary: str, sections: list[str]) -> str:
    return "\n".join([
        generate_tldr(summary),
        generate_jump_links(sections),
        html
    ])