import importlib
import os

def test_all_modules_importable():
    modules = [
        "src.fetch_arxiv",
        "src.fetch_pwc",
        "src.fetch_github",
        "src.fetch_hn",
        "src.aggregator",
        "src.summariser",
        "src.mailer",
    ]
    for mod in modules:
        assert importlib.import_module(mod) is not None, f"Failed to import {mod}"

def test_templates_exist():
    assert os.path.exists("templates/digest.html")

def test_main_importable():
    import main
    assert hasattr(main, "main")
