DIR=$(pwd)
echo "$DIR"

function pipInstall() {
    cd $DIR
    cd $(find . -name requirements.txt | xargs dirname)
    echo "****Installing pip packages****"
    python3 -m pip install -r requirements.txt
}

function gemInstall() {
    cd $DIR
    cd $(find . -name Gemfile | xargs dirname)
    echo "****Installing gems****"
    bundle install
}

function nodepkgInstall() {
    cd $DIR
    cd $(find . -name package.json ! -path '*/node_modules/*' | xargs dirname)
    echo "****Installing node_modules****"
    npm install
}

echo "What is your backend framework?"
select item in Ruby Python Exit; do
    case $item in Ruby)
        echo "Do you have a frontend framework?"
        select choice in Yes No Exit; do
            case $choice in Yes)
                gemInstall
                nodepkgInstall
                ;;
            esac
            case $choice in No)
                gemInstall
                ;;
            esac
            case $choice in Exit)
                exit
                ;;
            esac
        done
        ;;
    esac
    case $item in Python)
        echo "Do you have a frontend framework?"
        select choice in Yes No Exit; do
            case $choice in Yes)
                pipInstall
                nodepkgInstall
                ;;
            esac
            case $choice in No)
                pipInstall
                ;;
            esac
            case $choice in Exit)
                exit
                ;;
            esac
        done
        ;;
    esac
    case $item in Exit)
        exit
        ;;
    esac
done
